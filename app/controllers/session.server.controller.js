exports.setSession = function(req, res){
  req.session.name = req.body.name;
  req.session.age = req.body.age;
  res.json({"message":"Session cookies has been set folks"});
};

exports.sessionGet = function(req, res, next){
  res.json(req.session);
};
