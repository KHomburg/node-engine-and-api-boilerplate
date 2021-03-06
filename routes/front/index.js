const express = require("express");
const router = express.Router();

//require controllers:
const index = require("../../controllers/index")


//test route
router.get("/", (req, res) => {
  const getter = index.get(req, res)
  res.render('pages/index/index', {getter});
});

//test route
router.get("/1", (req, res) => {
  const getter = index.get(req, res)
  res.render('pages/index/index', {getter: {test: "1"}});
});

module.exports = router;