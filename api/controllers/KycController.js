/**
 * KycController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs')
const path = require('path');

const fileUploadPromiseConverter = (file) => {
  return new Promise((resolve, reject) => {
    file.upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    }, async (err, uploadedFile) => {
      if(err) {
        sails.log.info('Error when uploading file')
        return reject('err');
      }
      const media = await Media.create({
        fd: uploadedFile[0].fd,
        size: uploadedFile[0].size,
        type: uploadedFile[0].type,
        filename: uploadedFile[0].filename,
        status: uploadedFile[0].status,
        field: uploadedFile[0].field,
        extra: uploadedFile[0].extra,
      }).fetch();
      return resolve(media);
    });
  });
};

module.exports = {
  //user api's
  updateKyc: (req, res) => {
    const { addressProofDocType, identityProofDocType} = req.body;
    Promise.all([
      fileUploadPromiseConverter(req.file('addressProof')),
      fileUploadPromiseConverter(req.file('identityProof')),
    ]).then(r => {
      Kyc.update({user: req.payload.id}).set({
        status: 'PENDING',
        addressProof: r[0].id,
        identityProof: r[1].id,
        addressProofDocType,
        identityProofDocType
      }).fetch().then(result => {
        res.ok(result);
      }).catch(e => {
        sails.log.error(e)
      });
    });
  },

  getKycDocTypes:(req, res)=> {
    KycDocType.find({enabled:true})
    .then(documentTypes => res.ok(documentTypes))
    .catch(e => { 
      sails.log.error(e);
      res.badRequest('something went wrong');
    });
  },


  // admin api's
  verifyKyc: async (req, res) => {
      const {id} = req.query;
      Kyc.update({id}).set({status: 'APPROVED'}).fetch().then(async result => {
        if(result.length > 0 && result[0].user) {
          await User.update({id:result[0].user}).set({kycVerified:true}).fetch();
        }
        res.ok(result);
      })
  },
  rejectKyc: (req, res) => {
      const {id} = req.query;
      Kyc.update({id}).set({status: 'REJECTED'}).fetch().then(async result => {
        if(result.length > 0 && result[0].user) {
          await User.update({id:result[0].user}).set({kycVerified:false}).fetch();
        }
        res.ok(result);
      })
  },
};

