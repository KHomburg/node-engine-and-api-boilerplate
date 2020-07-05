/**
 * Import middleware
 */
const mw = require("../middleware/middlewareTest")

/**
 * Import Routers
 */

//front routes
const index = require("./front/index");
const notes = require("./front/notes");

//api routes
const apiIndex = require("./api/index");
const apiUsers = require("./api/users");
const apiNotes = require("./api/notes");

/**
 * define paths for according routers
*/
const paths = {
  //routes for rendering frontend
  index: "/",
  notes: "/notes",
  //routes for api
  apiIndex: "/api",
  apiUsers: "/api/users",
  apiNotes: "/api/notes"
}

module.exports = {
  paths,
  index: {middleware: [mw.sampleMiddleware], router: index},
  notes: {middleware: [], router: notes},
  apiIndex: {middleware: [], router: apiIndex},
  apiUsers: {middleware: [], router: apiUsers},
  apiNotes: {middleware: [], router: apiNotes},
}
