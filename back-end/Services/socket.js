const { Server } = require('socket.io');

module.exports = function initializeSocket(server){
  const io = new Server(server, {cors: {origin: '*'}});

  io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('joinChatRoom', (userId) => {
      socket.join(userId);
    });

    socket.on('disconnect', () => {
      console.log("User disconnected");
    })
  });

  return io;
}