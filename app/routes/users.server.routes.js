var users = require('../controllers/users.server.controller');

module.exports = function(app){
  app.route("/users").post(users.create).get(users.list);

  app.route("/users/:userId")
   .get(users.read)
   .put(users.update)
   .delete(users.delete);

  /// Finding users by Username
  app.routes("/usernames/:userName")
    .get(users.read)
    .put(users.update)
    .delete(users.delete);



  app.param('userId', users.userById);
  app.param("userName", users.userByUsername);
};
