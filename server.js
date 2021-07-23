const PORT = process.env.PORT || 8000
const express = require('express')
const app = express()
const server = require('http').Server(app)  //creates a new socket.io instance attached to the http server
const io = require('socket.io')(server)    //The Server instance
const { v4: uuidV4 } = require('uuid')
const path = require('path')
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const Message = require('./models/Message');
const authRoute = require("./routes/auth");
const DB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@video-engage-app.vj0ar.mongodb.net/mern-app?retryWrites=true&w=majority`
const usersInRoom = [];
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(authRoute);

//DB connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);

  });


//Server static assets if in production

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



//app.post to handle POST requests
app.post('/', (req, res) => {
  var n = uuidV4();
  res.status(200).json({ success: true, roomId: n })

})



// "/room" is here a commnication channel
//Whenever someone connects this gets executed

io.of("/Room").on('connection', (socket) => {


  //socket. is used for client side,roomId,userId is sent by a client
  socket.on('join-room', (roomId, userId, username) => {



    if (usersInRoom.length === 3) {
      return;
    }

    usersInRoom.push(userId);
    socket.join(roomId)

    //broadcast to all users in the room about a new connection
    socket.broadcast.to(roomId).emit('user-connected', userId, username)


    Message.find({ "roomId": roomId }).sort({ createdAt: -1 }).limit(10).exec((err, messages) => {
      if (err) return console.error(err);
      console.log("msg fetched")
      // Send the last 10 messages to the user.
      socket.emit('init', messages);
    });



    //when someone in the room sends a message
    socket.on("message", (msg) => {
      console.log(username + "sent a message");
      const message = new Message({

        roomId: msg.roomId,
        content: msg.content,
        sender: username,
      });

      // Save the message to the database.
      message.save((err) => {
        if (err) return console.error(err);
      });
      socket.broadcast.to(roomId).emit("createMessage", message, username);
    })


    socket.on('disconnect', () => {

      socket.broadcast.to(roomId).emit('user-disconnected', userId)
      for (var i = 0; i < usersInRoom.length; i++) {
        if (usersInRoom[i] == userId) usersInRoom.splice(i);
      }


    })

  })


  socket.on('message-room', (roomId, userId, username) => {

    Message.find({ "roomId": roomId }).sort({ createdAt: -1 }).limit(10).exec((err, messages) => {
      if (err) return console.error(err);

      // Send the last 10 messages to the user.
      socket.emit('init', messages);
    });
    if (usersInRoom.length > 2) {
      console.log("memoryFull");
      // return("http://localhost:3000");

    }
    socket.join(roomId)


    usersInRoom.push(userId);

    socket.on("message", (msg) => {
      console.log("msg arrived:");
      console.log(msg);
      const message = new Message({

        roomId: msg.roomId,
        content: msg.content,
        sender: username,
      });

      // Save the message to the database.
      message.save((err) => {
        if (err) return console.error(err);
      });
      console.log("messdage saved to db");
      socket.broadcast.to(roomId).emit("createMessage", message, username);
    })

    socket.on('disconnect', () => {

      socket.broadcast.to(roomId).emit('user-disconnected', userId)
      for (var i = 0; i < usersInRoom.length; i++) {
        if (usersInRoom[i] == userId) usersInRoom.splice(i);
      }


    })

  })

})

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

server.listen(PORT, () => {
  console.log(`server running ${PORT}`)
})
