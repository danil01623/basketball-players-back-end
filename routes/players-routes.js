const express = require("express");
const { check } = require("express-validator");
const playersControllers = require("../controllers/players-controllers");
const router = express.Router();

router.get("/:id", playersControllers.getPlayerById);
router.get("/", playersControllers.getPlayers);

router.post(
  "/",
  [
    check("first_name").not().isEmpty(),
    check("last_name").not().isEmpty(),
    check("team").not().isEmpty(),
  ],
  playersControllers.createPlayer
);

router.patch("/:id", playersControllers.updatePlayer);

module.exports = router;
