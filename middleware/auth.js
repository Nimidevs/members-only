const loggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("user has been auhtneticated");
    next();
  } else {
    res.redirect("/clubhouse/login");
  }
};

module.exports = loggedIn;

