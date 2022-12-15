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
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await sails.helpers.addUpdateUser({
        username: profile.id,
        socialId: profile.id,
        socialAccountType: "FACEBOOK",
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: `${profile.id}@email.com`,
      });
      done(null, user);
    }
  )
);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: social.gmailClientId,
    },
    async (parsedToken, googleId, done) => {
      let user = await sails.helpers.addUpdateUser({
        username: googleId,
        socialId: googleId,
        socialAccountType: "GMAIL",
        firstName: parsedToken.payload.given_name,
        lastName: parsedToken.payload.family_name,
        email: parsedToken.payload.email,
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
