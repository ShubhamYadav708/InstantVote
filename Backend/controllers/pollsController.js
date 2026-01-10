const Poll = require("../models/poll");
const { getIO } = require("../socket");

const createPoll = async (req, res) => {
  try {
    const poll = await Poll.create(req.body);
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  res.json(poll);
};

const votePoll = async (req, res) => {
  const { optionIndex } = req.body;
  const poll = await Poll.findById(req.params.id);

  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  if (poll.expiresAt && new Date() > poll.expiresAt) {
    return res.status(403).json({ message: "Poll expired" });
  }

  if (
    optionIndex === undefined ||
    optionIndex < 0 ||
    optionIndex >= poll.options.length
  ) {
    return res.status(400).json({ message: "Invalid option index" });
  }

  poll.options[optionIndex].votes += 1;
  await poll.save();

  const io = getIO();
  io.to(req.params.id).emit("resultsUpdated", poll);

  res.json(poll);
};


module.exports = {
  createPoll,
  getPoll,
  votePoll
};
