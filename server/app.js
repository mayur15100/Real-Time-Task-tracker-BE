// server.js
import express from "express";
import mongoose from "mongoose";
import AllRoutes from "./router.js";
import bodyparser from "body-parser";
import cors from "cors";
import http from "http";

// Express app
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyparser.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyparser.json({ limit: "200mb" }));

import { socketOpen } from "./service/socket.js";

socketOpen(server);
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/task_manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

AllRoutes(app);
// Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('New client connected');

//   // Handle socket events here
// });

// Start server
const PORT = 5003;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
