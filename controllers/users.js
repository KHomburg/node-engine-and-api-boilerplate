const models = require("../models")
const validate = require("../helpers/validation")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const get = async (req, res, next) => {
  try{
    const users = await models.User.findAll({attributes: ["id", "username", "email"]})
    if(users){
      return users
    }else{
      throw ["No Users found"]
    }
  }catch(e){
    throw e
  }
};

//register route
const post = async (req, res, next) => {
  try{
    const validationErrors = await validate.validateRegistration(req, res)
    if(validationErrors) throw validationErrors

    let user = await models.User.findOne({ where: { email: req.body.email } })
    if (user) throw ["E-Mail already in use"]

    bcrypt.genSalt(10, (err, salt) => {
      if (err) next(err)
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) next(err)
        models.User.create(
          {
            username: req.body.username,
            password: hash,
            email: req.body.email.toLowerCase(),
          }
        )
        .then(user => {
          user.password = "hidden"
          return user
        })
        .catch((err) => next(err))
      }, null)
    })

  }catch(e){
    throw e
  }
}

//login route
const login = async (req, res, next) => {
  try{
    const validationErrors = await validate.validateLogin(req, res)
    if(validationErrors) throw validationErrors

    const user = await models.User.findOne({ where: { email: req.body.email } })
    if(!user) throw ["Entered E-Mail address is unknown"]
    
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch) throw ["Wrong password"]
    
    const payload = {
      id: user.id,
      email: user.email,
      name: user.username
    };
    var test = "test"
    const token = await jwt.sign(payload, secret);
    return {token: `Bearer ${token}`, currentUser: payload}
  }catch(e){
    throw e
  }
}


module.exports = {
  get,
  post,
  login,
}
