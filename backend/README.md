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
// Nous allons importer les paquets nécessaires
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Nous allons utiliser les données de notre fichier de configuration
// Voir le README.md pour plus d'informations sur les données de configuration
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT, CALLBACK_URL } =
  process.env;

const CALLBACK_URL =
  CALLBACK_URL || `http://localhost:${PORT}/auth/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
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

1. Nous allons dans la liste de gauche, choisir "Identifiants"
![](../_doc/1.png)

2. Une fois dessus, nous allons cliquer sur `Créer des identifiants` et ensuite `ID client OAuth`
![](../_doc/2.png)

3. Il se peut que nous ayons ce type de rendu, alors ce n'est pas grave, nous allons cliquer sur `CONFIGURER L'ÉCRAN DE CONSENTEMENT`
![](../_doc/3.png)

4. Nous allons choisir `Externes`, pourquoi ? Parce que c'est pas possible de choisir l'autre 😂
![](../_doc/4.png)

5. Nous allons donner un nom à notre application et un mail pour l'utilisateur, vous pouvez mettre la votre
![](../_doc/5.1.png)

5.1. Et pour finir, nous allons mettre nos coordonnées de contact
Et ensuite on clique sur `Enregistrer et continuer`
![](../_doc/5.2.png)

6. Une petite vidéo pour vous montrer comment ça marche

[![tuto](https://cdn-icons-png.flaticon.com/512/1384/1384060.png)](https://youtu.be/DIh_t-tm4IA "tuto")

## On continue

Une fois la création faite, nous allons importer notre fichier `config.js` qui se trouve dans le dossier `passport` vers la dossier `src` dans `app.js`. 
