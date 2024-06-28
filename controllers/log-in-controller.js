const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render("log-in-form");
});

exports.log_in_post = [
  body("username")
    .trim()
    .isLength({ min: 4, max: 100 })
    .withMessage("Username length must be between 4 and 100")
    .isAlphanumeric()
    .withMessage("username can only contain alphanumeric characters")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("password must be between 8 and 20 ")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    )
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("log-in-form", {
        user: req.body,
        errors: errors.array(),
      });
    } else {
      // These only advantage is that it can send error messages to the frontend, you would have to call req.login to serialize user
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.render("log-in-form", {
            user: req.body,
            errors: [{ msg: info.message }],
          });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);

      /*for this i do not have to call req.login it automatically serializes 
      user, but theres no way to send error messages to the front end*/
      // passport.authenticate("local", {
      //   successRedirect: "/",
      //   failureRedirect: "/clubhouse/login",
      // })(req, res, next);
    }
  }),
];
