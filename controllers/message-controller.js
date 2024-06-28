const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const moment = require("moment");

exports.create_message_get = asyncHandler(async (req, res, next) => {
  res.render("create-message-form", {
    user: req.user,
    title: "Create Message",
  });
});

exports.create_message_post = [
  body("title")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title is too long")
    .escape(),
  body("content")
    .trim()
    .isLength({ max: 1000 })
    .withMessage("messge too long")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newMessage = new Message({
      title: req.body.title,
      timestamp: moment().format(),
      msg_text: req.body.content,
      author: req.user._id,
    });
    if (!errors.isEmpty()) {
      res.render("create-message-form", {
        user: req.user,
        title: "Create Message",
        message: newMessage,
        errors: errors.array(),
      });
    } else {
      await newMessage.save();
      res.render("create-message-form", {
        user: req.user,
        title: "Create Message",
        success: "You've successfully added a new message",
      });
    }
  }),
];

exports.update_message_get = asyncHandler(async (req, res, next) => {
  const updateMessage = await Message.findById(req.params.id);
  console.log(updateMessage);
  res.render("create-message-form", {
    user: req.user,
    title: "Update Message",
    message: updateMessage,
  });
});

exports.update_message_post = [
  body("title")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title is too long")
    .escape(),
  body("content")
    .trim()
    .isLength({ max: 1000 })
    .withMessage("messge too long")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const updatedMessage = new Message({
      title: req.body.title,
      timestamp: moment().format(),
      msg_text: req.body.content,
      author: req.user.id,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("create-message-form", {
        user: req.user,
        title: "Update Message",
        message: updatedMessage,
        errors: errors.array(),
      });
    } else {
      await Message.findByIdAndUpdate(req.params.id, updatedMessage, {});
      res.render("create-message-form", {
        user: req.user,
        title: "Update Message",
        success: "You've successfully updated the message",
      });
    }
  }),
];

exports.delete_message_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
