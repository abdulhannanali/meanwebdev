exports.render = function(req, res){

  if (req.session.lastVisit){
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date().getTime();

  res.render("index", {
    title: "Hello World"
  });
};
