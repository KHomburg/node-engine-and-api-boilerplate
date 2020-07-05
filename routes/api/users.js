const express = require("express");
const router = express.Router();
const passport = require('passport');

//require controllers:
const users = require("../../controllers/users")

//get all users; PRIVATE
router.get("", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const user = await users.get(req, res, next)
    res.json(user)
  }catch (e){
    res.status(500).json({"errors": e})
  }
})

//register a new user; PUBLIC
router.post("", async (req, res, next) => {
  try{
    const user = await users.post(req, res, next)
    res.json(user)
  }catch (e){
    res.status(500).json({"errors": e})
  }
});

//register a new user; PUBLIC
router.post("/login", async (req, res, next) => {
  try{
    const payload = await users.login(req, res, next)
    console.log(payload)
    res.json(payload)
  }catch (e){
    console.log(e)
    res.status(500).json({"errors": e})
  }
});

module.exports = router;