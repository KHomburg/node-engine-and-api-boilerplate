const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const cookieParser = require('cookie-parser');

const exphbs = require('express-handlebars');

dotenv.config({ path: ".env" });

/*
Create Express server.
*/
const app = express();

/*
Database configuration
*/
const { Pool, Client } = require("pg");
const client = new Client();
const db = require("./models/index")

db.sequelize.authenticate()
  .then(() => {console.log("Success!")})
  .catch(err => {console.log(err)});

/*
Express Config:
*/
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);

// Register Handlebars view engine
//app.engine('handlebars', exphbs());
// Use Handlebars view engine
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
  //viewsDir: __dirname + '/views',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'index',
  extname: '.hbs'
}));
//Serves static files (we need it to import a css file)
app.use(express.static('public'))

//app.use(expressStatusMonitor());
app.use(logger("dev"));
app.use(bodyParser.json({limit: 10000000}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
//require('./config/passport-config')(passport);


/*
Controllers/route handlers.
*/
//TODO: restructure to enable usage of middlware for routers
const router = require("./routes/router");
for (const [ route, path ] of Object.entries(router.paths)) {
  app.use(path, router[route].middleware, router[route].router);
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log("!!!    ERROR     !!!: " + err.message)
  res.status(err.status || 500);
  if(err.message){
    res.json({errors: [err.message]});
  }else if(err.errors.message){
    res.json({errors: [err.errors.message]});
  }else{
    res.json({errors: [err]});
  }
});



/*
Start Express server.
*/
db.sequelize.sync().then(x => {
  app.listen(app.get("port"), () => {
    console.log(
      "App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
})


module.exports = app;