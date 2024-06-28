const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form");
});

exports.sign_up_post = [
  //vaidate every input
  body("firstname", "FirstName is not valid")
    .trim()
    .isLength({ min: 4, max: 100 })
    .escape(),
  body("lastname", "lastName is not valid")
    .trim()
    .isLength({ min: 4, max: 100 })
    .escape(),
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
    console.log(errors);

    if (!errors.isEmpty()) {
      res.render("sign-up-form", { user: req.body, errors: errors.array() });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
          member: false,
          admin: false,
        });
        await newUser.save();
        res.redirect("/clubhouse/login");
      } catch (error) {
        next(error);
      }
    }
  }),
];
