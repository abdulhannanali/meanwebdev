var config = require("./config"),
    express = require("express"),
    session = require("express-session"),
    RedisStore = require("connect-redis")(session),
    morgan = require("morgan"),
    compress = require("compression"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    passport = require("passport");


module.exports = function(){
  var app = express();

  if (process.env.NODE_ENV === "development"){
      app.use(morgan('dev'));
      console.log("Middlewares of the development environment have been set up");
  }
  else if (process.env.NODE_ENV === "production"){
    app.use(compress());
    console.log("Middlewares of the production environment have been  set up");
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Express Session Initializer

  // RedisClient

  app.use(session({
    store: new RedisStore(config.redisOptions),
    saveUninitialized: true,
    resave: true,
    secret : config.sessionSecret
  }));

  app.set("views" , "./app/views");
  app.set("view engine", "ejs");

  // Setting up the passport middlewares
  app.use(passport.initialize());
  app.use(passport.session());

  /// Defining routes for the app
  require('../app/routes/index.server.routes')(app);
  require("../app/routes/users.server.routes")(app);
  require("../app/routes/session.server.routes")(app);

  //Exprss static middle ware for serving static files
  app.use(express.static('./public'));
  return app;
};
