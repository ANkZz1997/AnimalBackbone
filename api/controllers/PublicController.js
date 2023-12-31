const ipfs = require('ipfs-http-client');
const randomWords = require('random-words');
const crypto = require('crypto');
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
const templates = require('./../constants/EmailTemplates');


var exec = require('child_process').exec;

const encrypt = (ivl, key, text) => {
  const algorithm = 'aes256';
  const iv = crypto.randomBytes(ivl);
  let cipher = crypto.createCipheriv( algorithm, Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}
const decrypt = (key, text) => {
  const algorithm = 'aes256';
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  localIpfsNodeTest: async (req, res) => {
    // const client = ipfs.create(new URL('https://nft.sdnatech.com/ipfs/ipfs/api/v0'));
    // const client = ipfs.create({host: 'nft.sdnatech.com/ipfs', port: '80',  apiPath: '/ipfs/api/v0'});
    const client = ipfs.create({host: 'localhost', port: '5001',  apiPath: '/ipfs/api/v0'});
    console.log(client.version())
    const data = {name: 'Ahsan Ahmad Raheel', dob: '01/01/1993', contact: '+91 855-800-5893'};
    client.add({
      path: 'abc.json',
      content: JSON.stringify(data)
    } ).then(result => {
      console.log(result);
      res.ok(result);
    }).catch(e => {
      console.log(e);
      res.badRequest(e);
    });
  },
  createWallet: async (req, res) => {
    const ivl = 16;
    const account = web3.eth.accounts.create();
    const wallet = await Wallet.create(account).fetch();
    const words = randomWords(10);
    const rawKey = words.join("");
    const key = crypto.createHash('sha256').update(rawKey).digest('hex');
    const encryptedPrivateKey = encrypt(ivl, key, wallet.privateKey);
    const decryptedPrivateKey = decrypt(key, encryptedPrivateKey);
    res.ok({
      wallet, words, rawKey, key, encryptedPrivateKey, decryptedPrivateKey
    });
  },
  updateBase: (req, res) => {
    exec('git pull', {cwd: 'F:\\animal-backbone-dev'}, (err, stdout, stderr) => {
      exec('pm2 restart 6', {cwd: 'F:\\animal-backbone-dev'}, (_err, _stdout, _stderr) => {
        res.ok({err, stdout, stderr, _err, _stdout, _stderr});
      });
    })
  },
  s: (req, res) => {
    console.log('subscribing');
    sails.sockets.join(req, 'conversation')
    res.ok()
  },
  t: (req, res) => {
    console.log('testing socket');
    sails.sockets.broadcast('conversation', 'msg', {h: 123456789})
    res.ok()
  },
  test: async (req, res) => {
    console.log(req.body.id)
    Kyc.create({user: req.body.id}).then(_result => {
      sails.log.info(`User's Kyc record created`)
      res.ok("Created")
    });
  },
  emailSubscribe: async (req, res) => {
    const {email} = req.body;
    const emailSubscription = await Emailsubscription.find({email: email});
    if(emailSubscription.length > 0){
      res.badRequest('Already Subscribed');
    } else {
      await Emailsubscription.create({ email: email });
      res.ok();
    }
  },

  contactUs: async (req, res) => {
    try {
      const { name, email, phoneNumber, message } = req.body;
      await ContactUs.create({name, email, phoneNumber, message });
      const settings = await sails.helpers.fetchSettings();
      const info = { ...settings, name, email, phoneNumber, message };

      sails.helpers.sendMail(sails.config.custom.contactEmail, templates.contactusEmail.subject(), '', templates.contactusEmail.content(info)).then(r => {
        sails.log.info('Sending Thankyou email on contactus');
      });

      const thankInfo = { ...settings, name };
      sails.helpers.sendMail(email, templates.thankyouEmail.subject(), '', templates.thankyouEmail.content(thankInfo)).then(r => {
        sails.log.info('Sending Thankyou email on contactus');
      });

      res.ok();
    } catch (err) {
      return res.badRequest(err);
    }
  },
}
