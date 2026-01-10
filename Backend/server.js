const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

dotenv.config();

const connectDB = require("./config/db");
const pollRoutes = require("./routes/pollRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("./config/passport");
const oauthRoutes = require("./routes/oauthRoutes");
const { initSocket } = require("./socket");

connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());


app.use("/api/polls", pollRoutes);
app.use("/api/auth", authRoutes);
app.use("/auth", oauthRoutes);

initSocket(server);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
