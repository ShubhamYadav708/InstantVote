const { Server } = require("socket.io");
const Poll = require("./models/poll");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinPoll", (pollId) => {
      socket.join(pollId);

      const room = io.sockets.adapter.rooms.get(pollId);
      const viewers = room ? room.size : 0;

      io.to(pollId).emit("viewerCount", viewers);
    });

    socket.on("disconnecting", () => {
      socket.rooms.forEach((roomId) => {
        if (roomId === socket.id) return;

        const room = io.sockets.adapter.rooms.get(roomId);
        const viewers = room ? room.size - 1 : 0;

        io.to(roomId).emit("viewerCount", viewers);
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

setInterval(async () => {
  if (!io) return; 

  try {
    const now = new Date();

    const expiredPolls = await Poll.find({
      expiresAt: { $lte: now },
      expiredNotified: { $ne: true }
    });

    for (const poll of expiredPolls) {
      io.to(poll._id.toString()).emit("pollExpired");

      poll.expiredNotified = true;
      await poll.save();
    }
  } catch (err) {
    console.error("Poll expiry check failed:", err.message);
  }
}, 1000);

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO
};

