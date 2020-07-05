const express = require("express");
const router = express.Router();

//require controllers:
const notes = require("../../controllers/notes")


//test route
router.get("", (req, res) => {
  try{
    const getter = notes.get(req, res)
    res.json(getter);
  }catch (e){
    res.status(500).json({"errors": e})
  }
});

module.exports = router;