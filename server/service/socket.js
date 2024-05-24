import { Server as SocketServer } from "socket.io";
let io = null;

// Socket.IO connection
export function socketOpen(server) {
  try {
    io = new SocketServer(server);
    io.sockets.on("connection", (socket) => {
      //todo create one callback function
      socket.on("test", (data) => {
        console.log("test", data);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

// Publish Message To socket.
export async function socketPublishMessage(publishChannelName, publishData) {
  try {
    io.sockets.emit(publishChannelName, publishData);
    return "success";
  } catch (error) {
    return error.message.toString();
  }
}
