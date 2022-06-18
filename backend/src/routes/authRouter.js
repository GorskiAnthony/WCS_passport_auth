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

/**
 * @route   GET auth/success
 * @desc    Renvoi un message de succès lorsque l'authentification a réussi l'utilisateur
 */
router.get("/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "Authenticate success", user: req.user });
  }
});

router.delete("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ message: "Logout failed" });
    }
  });
  res.status(200).json({ message: "Logout success" });
});

module.exports = router;
