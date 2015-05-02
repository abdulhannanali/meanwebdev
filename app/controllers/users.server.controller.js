var User = require("mongoose").model("User");

exports.create = function(req, res, next){
  var user = new User(req.body);
  user.save(function(err){
    if (err){
      next(err);
    }
    else{
      res.json(user);
    }
  });
};

exports.list = function(req, res, next){
  User.find({}, "username email", {limit: 2, _id: false}, function(err, users){
    if (err) {
      return next(err);
    }
    else {
      res.json(users);
    }
  });
};

exports.read = function(req,res){
  res.json(req.user);
};

exports.userById = function(req, res, next, id){
  console.log(id);
  User.findOne({_id: id}, function(err, user){
    if (err){
      next(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};

exports.update = function(req, res, next){
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
    if (err) {
      return next(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.delete = function(req, res, next){
  req.user.remove(function(err){
    if (err){
      return next(err);
    }
    else {
      res.json(req.user);
    }
  });
};
