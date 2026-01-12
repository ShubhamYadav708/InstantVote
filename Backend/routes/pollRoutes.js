const express = require("express");
const authMiddleware=require("../middleware/authMiddleware");
const {
  createPoll,
  getPoll,
  votePoll
} = require("../controllers/pollsController");

const router = express.Router();

router.post("/",authMiddleware,createPoll);

router.get("/:id", getPoll);

router.post("/:id/vote", votePoll);

module.exports = router;
