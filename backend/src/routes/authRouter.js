const router = require("express").Router();

router.get("/google", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
