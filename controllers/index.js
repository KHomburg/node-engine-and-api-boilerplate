const express = require("express");
const router = express.Router();

//test route
const get = (req, res ) => {
  return {test: "test"}
}


module.exports = {
  get,
}
