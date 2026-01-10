const express = require("express");
const {
  createPoll,
  getPoll,
  votePoll
} = require("../controllers/pollsController");

const router = express.Router();

router.post("/", createPoll);

router.get("/:id", getPoll);

router.post("/:id/vote", votePoll);

module.exports = router;
