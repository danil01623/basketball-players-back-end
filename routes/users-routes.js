const express = require("express");

const userControllers = require("../controllers/users-controllers");

const router = express.Router();

// router.get("/", userControllers);

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

// router.patch("/:id", userControllers);

module.exports = router;
