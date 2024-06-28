const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const Messages = require("../models/message");

exports.index_get = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const messages = await Messages.find().populate("author").exec();
    return res.render("index", { user: req.user, messages: messages });
  } else {
    return res.redirect("/clubhouse/login");
  }
});

//Become A Member

exports.index_become_a_member_get = asyncHandler(async (req, res, next) => {
  res.render("become-a-member-form", { user: req.user });
});
exports.index_become_a_member_post = [
  body("secretcode")
    .trim()
    .isLength({ min: 4, max: 4 })
    .withMessage("secret code must be a 4 digit number")
    .isNumeric()
    .matches("0126")
    .withMessage("You entered the wrong code")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("become-a-member-form", {
        user: req.user,
        errors: errors.array(),
      });
    } else {
      const updatedUser = new User({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        username: req.user.username,
        password: req.user.password,
        member: true,
        admin: false,
        _id: req.user._id,
      });
      const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        updatedUser,
        {}
      );
      res.render("become-a-member-form", {
        user: req.user,
        success: "You're now a member of the clubHouse",
      });
    }
  }),
];

exports.index_become_an_admin_get = asyncHandler(async (req, res, next) => {
  res.render("become-an-admin-form", { user: req.user });
});
exports.index_become_an_admin_post = [
  body("secretcode")
    .trim()
    .isLength({ min: 4, max: 4 })
    .withMessage("secret code must be a 4 digit number")
    .isNumeric()
    .matches("0309")
    .withMessage("You entered the wrong code")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("errors present")
      res.render("become-an-admin-form", {
        user: req.user,
        errors: errors.array(),
      });
    } else {
      const updatedUser = new User({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        username: req.user.username,
        password: req.user.password,
        member: true,
        admin: true,
        _id: req.user._id,
      });
      const updateUser = await User.findByIdAndUpdate(
        req.user._id,
        updatedUser,
        {}
      );
      res.render("become-an-admin-form", {
        user: req.user,
        success: "You're now an admin of the clubHouse",
      });
    }
  }),
];

//Become an Admin
