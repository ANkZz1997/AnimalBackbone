/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  '*': 'isAuthenticated',
  AuthController: {
    '*': true
  },
  MediaController: {
    download: true
  },
  PublicController: {
    '*': true
  },
  StripeController: {
    'verifyPayment': true
  },
  AdminController: {
    '*': ['isAuthenticated', 'isAdmin']
  },
  DisputeController: {
    '*': ['isAuthenticated'],
    'markAsPending': ['isAuthenticated', 'isAdmin'],
    'newResponse': ['isAuthenticated', 'isAdmin'],
  },
  KycController: {
    '*': ['isAuthenticated'],
    'verifyKyc': ['isAuthenticated', 'isAdmin'],
    'rejectKyc': ['isAuthenticated', 'isAdmin'],
  },
  SocketController: {
    '*': ['isAuthenticated'],
    'joinUserRoom': ['isAuthenticated', 'isAdmin'],
  },
  MarketplaceController: {
    'index': true
  }
};
