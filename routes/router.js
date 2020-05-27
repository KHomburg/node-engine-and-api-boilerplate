/**
 * Import middleware
 */
const mw = require("../helpers/middlewareTest")

/**
 * Import Routers
 */

//front routes
const index = require("./front/index");
const notes = require("./front/notes");

//api routes
const apiIndex = require("./api/index");

/**
 * define paths for according routers
*/
const paths = {
  index: "/",
  notes: "/notes",
  apiIndex: "/api"
}

module.exports = {
  paths,
  index: {middleware: [mw.sampleMiddleware], router: index},
  notes: {middleware: [], router: notes},
  apiIndex: {middleware: [], router: apiIndex},
}
