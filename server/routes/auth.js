const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.json({ data: "Welcome to signup " });
});

module.exports = router;