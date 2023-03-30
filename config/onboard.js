module.exports.onboarding = async () => {
  sails.log.info('Onboarding Initiated')

  // admin check
  sails.log.info('checking if admin exist')
  const admins = await Admin.find().limit(1);
  if(!admins.length) {
    sails.log.info('no existing admin found, creating new admin.')
    const newAdmin = await Admin.create({name: 'Super Admin', username: 'admin', password: 'admin'});
    sails.log.info('created new admin');
    sails.log.info('credentials: admin/admin');
  } else {
    sails.log.info('an admin already exist, no further action required');
  }
  // admin check end

  // setting check
  sails.log.info('checking platform setting');
  const settings = await Settings.find().limit(1);
  if(!settings.length) {
    const newSettings = await Settings.create({uid: 1});
    sails.log.info('new settings are created');
  } else {
    sails.log.info('setting exist, no action required.')
  }
  // setting check end
};
