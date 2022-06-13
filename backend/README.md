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
