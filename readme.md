                            #Video-Chat-App

```https://video-engage-app.herokuapp.com/```

This app is build as solution to the problem statement of microsoft engage mentorship program 2021.
This app is used to do video chat for upto 3 users along with live chat.
An another chat feature is available too for the users to join chat only and this can provide upto ten older messages before the joining of chat.User can chat in this after as well as before the meet is started.
Authentication system is present, in order to use this any user needs to login first.

This is MERN stack based app.
client folder contains client side logic and outside files/folder are for server side.
the main logic of client side peer and socket  is in components/Room.js file.

Main libraries in client side.
1. Peerjs library   :used which provides provides a complete, configurable, and easy-to-use peer-to-peer API built on top of WebRTC, supporting both data channels and media streams.
2. Socket.io-client :a library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.

Main libraries in server side.
1.socket.io: a library for nodejs for realtime web applications 
2.uuid     : to generate unique IDs for roomId
3.bcrypt   : A library to help hash passwords



#Usage:
To use this on your local system clone this repositry
In terminal open this directory


npm init 
nodemon start  //for server start


In another terminal 
cd client 
npm run build
npm start  // to start the app

this app will be started at : http://localhost:3000/

#video-demo
https://www.youtube.com/watch?v=3HWqeTtsxw0
