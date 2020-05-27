const express = require("express");
const router = express.Router();

//test route
const get = (req, res ) => {
  return {test: "notes"}
}


module.exports = {
  get,
}
