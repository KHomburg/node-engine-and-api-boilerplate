const express = require("express");
const router = express.Router();

//require controllers:
const notes = require("../../controllers/notes")


//test route
router.get("", (req, res) => {
  const getter = notes.get(req, res)
  res.render('pages/index/index', {getter});
});

module.exports = router;