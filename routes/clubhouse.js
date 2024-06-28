const express = require("express");
const router = express.Router();

const log_in_controller = require("../controllers/log-in-controller");
const sign_up_controller = require("../controllers/sign-up-controller");
const index = require("../controllers/index-controller");
const message = require("../controllers/message-controller");

router.get("/", index.index_get);

//Log-in-routes
router.get("/login", log_in_controller.log_in_get);
router.post("/login", log_in_controller.log_in_post);

//Sign-up-routes
router.get("/signup", sign_up_controller.sign_up_get);
router.post("/signup", sign_up_controller.sign_up_post);

//Become A member routes
router.get("/become-a-member", index.index_become_a_member_get);
router.post("/become-a-member", index.index_become_a_member_post);

//Become A member routes
router.get("/become-an-admin", index.index_become_an_admin_get);
router.post("/become-an-admin", index.index_become_an_admin_post);

//Create Messages routes
router.get("/create-message", message.create_message_get);
router.post("/create-message", message.create_message_post);

// //Update Messages routes
router.get("/update-message/:id", message.update_message_get);
router.post("/update-message/:id", message.update_message_post);

//Delete Message Routes
router.post("/delete-message/:id", message.delete_message_post);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/clubhouse/login");
  });
});

module.exports = router;
