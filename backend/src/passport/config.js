const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Nous allons utiliser les données de notre fichier de configuration
// Voir le README.md pour plus d'informations sur les données de configuration
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT, CALLBACK_URL } =
  process.env;

const CALLBACK =
  CALLBACK_URL || `http://localhost:${PORT}/auth/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      /**
       * Nous allons ici récupérer les données du profile de Google
       * et les stocker dans une base de données
       */
      //console.log({ profile });
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
