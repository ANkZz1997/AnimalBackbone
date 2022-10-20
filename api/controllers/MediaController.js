/**
 * MediaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('3b96933e4292f6aedad8',
  'a8f68ea2894fd5046c4d3bcba027d1050faa1dea9edeaf23c197584823ec70b0');

module.exports = {
  upload: (req, res) => {
    req.file('nft').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    },(error, uploadedFile) => {
      if(error) return res.badRequest(error);
      console.log(uploadedFile[0].filename)
      saveImageInDB(uploadedFile, (error, result) => {
        if(error) { return res.badRequest(e)}
        else return res.ok(result)
      });
    })
  },
  uploadToIPFS: (req, res) => {
    const data = req.body;
    data.attributes = JSON.parse(data.attributes);
    req.file('nft').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    }, (error, uploadedFile) => {
      saveImageInDB(uploadedFile, (error, result) => {
        if(error) return res.badRequest(error);
        const readableStreamForFile = fs.createReadStream(uploadedFile[0].fd);
        console.log(uploadedFile);
        let options = {
          pinataMetadata: {name: uploadedFile[0].filename},
          pinataOptions: {cidVersion: 0}
        };
        pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
          console.log(result);
          data.image = "https://gateway.pinata.cloud/ipfs/" + result.IpfsHash;
          options = {
            pinataMetadata: {name: `${data.name}.json`},
            pinataOptions: {cidVersion: 0},
          };
          pinata.pinJSONToIPFS(data, options).then(_result => {
            data.metaData = "https://gateway.pinata.cloud/ipfs/" + _result.IpfsHash;
            Nft.create(data).fetch().then(result => {
              console.log(data);
              return res.ok(result)
            }).catch(e => {
              res.badRequest(e)
            })
          }).catch(err => {
            console.log(err);
            res.badRequest(err)
          })
        }).catch((err) => {
          console.log(err);
          res.badRequest(err)
        });
      })
    });
  }
};
const saveImageInDB = (uploadedFile, cb) => {
  Media.create({
    fd: uploadedFile[0].fd,
    size: uploadedFile[0].size,
    type: uploadedFile[0].type,
    filename: uploadedFile[0].filename,
    status: uploadedFile[0].status,
    field: uploadedFile[0].field,
    extra: uploadedFile[0].extra,
  }).fetch().then(result => {
    cb(null, result)
  }).catch(e => {
    cb(e);
  })
}

