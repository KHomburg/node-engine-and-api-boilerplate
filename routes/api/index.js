const express = require("express");
const router = express.Router();

//require controllers:
const index = require("../../controllers/index")


//test route
router.get("/", (req, res) => {
  const getter = index.get(req, res)
  res.json(getter);
});


module.exports = router;