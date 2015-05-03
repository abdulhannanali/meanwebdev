var session = require("../controllers/session.server.controller");

module.exports = function(app){
  app.route('/session')
      .get(session.sessionGet)
      .post(session.setSession);
};
