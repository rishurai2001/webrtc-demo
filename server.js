const { memory } = require('console')
const express = require('express')
const app = express()
const server = require('http').Server(app)  //creates a new socket.io instance attached to the http server
const io = require('socket.io')(server)  //The Server instance
const { v4: uuidV4 } = require('uuid')


const usersInRoom = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))



//app.post to handle POST requests
app.post('/', (req, res) => {
  var n=uuidV4();
  res.status(200).json({ success: true, roomId: n })
 
})


// "/room" is here a commnication channel
//Whenever someone connects this gets executed

io.of("/Room").on('connection', socket => {
 

    //socket. is used for client side,roomId,userId is sent by a client
    socket.on('join-room', (roomId, userId ) => {
       
       
    if(usersInRoom.length>2) {
      console.log("memoryFull");
     // return("http://localhost:3000");

     }
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId)

   
    usersInRoom.push(userId);
    
    socket.on("message", (message) => {
      console.log("msg arrived:");
      console.log(message);
      socket.broadcast.to(roomId).emit("createMessage", message);
    })
    
    socket.on('disconnect', () => {

      socket.broadcast.to(roomId).emit('user-disconnected', userId)
      for(var i=0;i<usersInRoom.length;i++){
          if(usersInRoom[i]==userId) usersInRoom.splice(i);
      }
     

    })

  })

})

server.listen(8000)
