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

// class ChatService {
//     constructor() {
//       this.io = null;
//     }
  
//     initialize(io) {
//       this.io = io;
//       io.on('connection', (socket) => {
//         console.log('New client connected');
  
//         socket.on('sendMessage', (message) => {
//           this.io.emit('receiveMessage', message);
//         });
  
//         socket.on('disconnect', () => {
//           console.log('Client disconnected');
//         });
//       });
//     }
//   }
  
//   module.exports = new ChatService();
