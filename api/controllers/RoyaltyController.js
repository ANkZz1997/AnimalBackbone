/**
 * RoyaltyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getRoyaltyDetails : async(req ,res)=>{
        Royalty.find({minter:req.payload.id}).populateAll().then( result =>{
            if(result){
                res.ok(result)
            }else{
                res.badRequest('no record found')
            }
        }).catch( e =>{
            res.badRequest(e)
        })
    }
};

