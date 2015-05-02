module.exports = function(app){
  var index = require("../controllers/index.server");
  app.get("/", index.render);
};
