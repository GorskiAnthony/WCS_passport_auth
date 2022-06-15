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
