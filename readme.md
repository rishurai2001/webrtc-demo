    #Video-Chat-App    

Hosted at: https://video-engage-app.herokuapp.com/

This app is build as solution to the problem statement of microsoft engage mentorship program 2021.<br/>
This app is used to do video chat for upto 3 users along with live chat.<br/>
An another chat feature is available too for the users to join chat only and this can provide upto ten older messages before the joining of chat.User can chat in this after as well as before the meet is started.<br/>
Authentication system is present, in order to use this any user needs to login first.<br/>

This is MERN stack based app.
client folder contains client side logic and outside files/folder are for server side.<br/>
the main logic of client side peer and socket  is in components/Room.js file.<br/>

Main libraries in client side.
1. Peerjs library   :used which provides provides a complete, configurable, and easy-to-use peer-to-peer API built on top of WebRTC, supporting both data channels and media streams.
2. Socket.io-client :a library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.

Main libraries in server side.
1. socket.io: a library for nodejs for realtime web applications.
2. uuid     : to generate unique IDs for roomId.
3. bcrypt   : A library to help hash passwords.
    
        #usage
To use this on your local system clone this repositry.
 In terminal open this directory.<br/>


npm init.<br/>
nodemon start  //for server start.<br/>


In another terminal.<br/>
 cd client<br/>
 npm run build<br/>
 npm start  // to start the app<br/>

this app will be started at : http://localhost:3000/

    #video-demo
https://www.youtube.com/watch?v=3HWqeTtsxw0
