const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleTokenStrategy = require("passport-google-id-token");
var GitHubStrategy = require("passport-github").Strategy;

const social = {
  facebookAppId: "428119419405148",
  facebookAppSecret: "8ef503b0a52e6baa446240302c8bca3c",
  gmailClientId:
    "144163062893-c48rp2sgka2ms7bl9o1r3nsln6mnctvt.apps.googleusercontent.com",
  githubAppSecret: "8510e049a36f4c574b321cf409be92753efe644d",
  githubAppId: "e52a7baf8974b879c90e",
};

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: social.facebookAppId,
      clientSecret: social.facebookAppSecret,
      fbGraphVersion: "v3.0",
      passReqToCallback: true
    },
    async (req,accessToken, refreshToken, profile, done) => {
      console.log(req.clientIp);
      let user = await sails.helpers.addUpdateUser({
        username: profile.id,
        socialId: profile.id,
        socialAccountType: "FACEBOOK",
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: (profile.emails)? profile.emails[0].value :`${profile.id}@email.com`,
        ipAddress: req.clientIp
      });
      done(null, user);
    }
  )
);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: social.gmailClientId,
      passReqToCallback: true
    },
    async (req,parsedToken, googleId, done) => {
      console.log(req.clientIp);
      let user = await sails.helpers.addUpdateUser({
        username: googleId,
        socialId: googleId,
        socialAccountType: "GMAIL",
        firstName: parsedToken.payload.given_name,
        lastName: parsedToken.payload.family_name,
        email: parsedToken.payload.email,
        ipAddress:req.clientIp
      });
      done(null, user);
    }
  )
);

// passport.use(
//   new InstagramStrategy(
//     {
//       clientID: social.facebookAppId,
//       clientSecret: social.facebookAppSecret,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       done(null, profile);
//     }
//   )
// );

passport.use(
  new GitHubStrategy(
    {
      clientID: social.githubAppId,
      clientSecret: social.githubAppSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
