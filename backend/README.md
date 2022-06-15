# 🗄 Backend

Nous allons donc créer une authentification avec [Passportjs](https://www.passportjs.org/).
Pour ce faire nous avons besoins de plusieurs paquets:

- [express](https://www.npmjs.com/package/express)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [passport](https://www.npmjs.com/package/passport)
- [passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20)

Par anticipation, nous allons installer aussi les paquets suivants:

- [cors](https://www.npmjs.com/package/cors)

Et pour finir, nous allons aussi installer [`morgan`](https://www.npmjs.com/package/morgan) qui permet de logger les requêtes HTTP.

```shell
npm install --save express dotenv passport passport-google-oauth20 cors
npm install --save-dev nodemon morgan
```

Une fois l'installation faite, nous allons réfléchire à la structure de notre application.

Nous allons tout d'abord créer un dossier `passport` avec un fichier `config.js` qui contiendra notre configuration de l'authentification. Nous allons utiliser la strategie de [l'authentification Google](https://www.passportjs.org/packages/passport-google-oauth20/).

```js
// ./src/passport/config.js
// Nous allons importer les paquets nécessaires
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Nous allons utiliser les données de notre fichier de configuration (.env)
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
```

Mais anthony ! Oui ? On récupère où les données `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` ?

Et bien c'est assez facile, nous allons nous rendre à cette adresse : [Console google](https://console.developers.google.com/)

Et une fois sur la page, il faut suivre les étapes suivantes :
⚠️ C'est la démarche pour un compte Google !

## Création de l'application OAuth

Une petite vidéo pour vous montrer comment créer l'authentification Google :

[![tuto](../_doc/bg.png)](https://youtu.be/DIh_t-tm4IA "tuto")


ℹ️ Vous vous doutez bien que j'ai supprimé l'application après le tuto 😉

## On continue

Une fois la création faite, nous allons importer notre fichier `.src/passport/config.js` vers le fichier `./src/app.js`. 

```js
// ./src/app.js
const config = require("./passport/config");
```

Voilà notre fichier `app.js`

```js
// ./src/app.js
const express = require("express");
const app = express();
const logger = require("morgan");

const config = require("./passport/config");
// Nous allons faire les choses bien, nous allons créer un fichier authRouter.js 
const authRouter = require("./routes/authRouter");

app.use(logger("dev"));
app.use("/auth", authRouter);

/**
 * Nous allons faire une route 404 qui renvoie une erreur 404
 */
app.use("/*", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

module.exports = app;
```

### Le fichier `authRouter.js`

```js
// ./src/routes/authRouter.js
const router = require("express").Router();

router.get("/google", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
```
## Ajout de passport

Maintenant, nous allons ajouter `passport` dans notre fichier `app.js` avec les éléments suivants :

```js
const passport = require("passport");
app.use(passport.initialize());
```

Full code :
```js
const express = require("express");
const app = express();
const logger = require("morgan");
const passport = require("passport");

const config = require("./passport/config");
const authRouter = require("./routes/authRouter");

app.use(logger("dev"));

app.use(passport.initialize());

app.use("/auth", authRouter);

/**
 * Nous allons faire une route 404 qui renvoie une erreur 404
 */
app.use("/*", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

module.exports = app;
```

### Le fichier `authRouter.js`

```js
const router = require("express").Router();
const passport = require("passport");

// CLIENT_ORIGIN permet de définir l'origine du site web
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

/**
 * @route   GET auth/google
 * @desc    Authentifie un utilisateur via Google
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * @route   GET auth/google/callback
 * @desc    Redirige l'utilisateur vers la page de connexion après qu'il ait authentifié via Google
 *         et que Google ait retourné les informations de l'utilisateur
 *         dans le callback de la requête
 *
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_ORIGIN,
    failureRedirect: "/auth/failure",
  })
);

/**
 * @route   GET auth/failure
 * @desc    Renvoi une erreur lorsque l'authentification a échoué
 */
router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Authenticate failed" });
});

module.exports = router;
```

