import React, { useEffect, useContext,useRef } from 'react'
import io from "socket.io-client";
import Peer from 'peerjs';
import '../Styles/ChatRoom.css'
import { AuthContext } from "../context/AuthContext";


function Room(props) {
    
    const ROOM_ID = props.match.params.roomId
    const { user } = useContext(AuthContext);

    const myPeer = useRef();
    const socket = useRef();

    myPeer.current = new Peer();



    const peers = useRef({});


    useEffect(() => {


        socket.current = io.connect("/Room");

        console.log('client side', myPeer.current);


        myPeer.current.on('open', id => {
            socket.current.emit('message-room', ROOM_ID, id,user.username)

        })

        socket.current.on("init", (msg) => {
            console.log(msg);
            for (let i =  msg.length-1; i>=0; i--) {
               
                let sp = document.createElement("span");
                let time=msg[i].createdAt;
                sp.innerHTML=time.slice(0,10)+"   "+ time.slice(12,17);
                sp.style.fontSize='8px';
    
                let li = document.createElement("li");
                li.innerHTML =msg[i].sender+ ":"+ "<br/>"+ msg[i].content; 
                li.style.backgroundColor = 'lavender';
                li.style.margin='5px';
                

                let divmsg = document.createElement("div");
                divmsg.className="initMessages"
                if((msg[i].sender).localeCompare(user.name)){

                    divmsg.style.backgroundColor='deepskyblue'
                    divmsg.style.alignSelf='flex-end';
                    li.style.backgroundColor='white';
                }
                divmsg.append(li,sp);

                document.getElementById("liveMessage").append(divmsg);                
                var chatBox = document.getElementById("chatBox");
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        });



        socket.current.on("createMessage", (msg) => {
            
            let li = document.createElement("li");
            li.innerHTML =msg.sender+":"+ "<br/>" + msg.content;
            li.style.backgroundColor = 'lavender';
            li.style.margin='8px';
            
            let sp = document.createElement("span");
            let today=new Date();
             
            sp.innerHTML=(today.getHours()) + ":" + today.getMinutes() ;;
            sp.style.fontSize='12px';
            sp.style.paddingRight='5px';

            let divmsg = document.createElement("div");
            divmsg.className="initMessages"
            
            divmsg.append(li,sp);
            document.getElementById("liveMessage").append(divmsg);
            var chatBox = document.getElementById("chatBox");
            chatBox.scrollTop = chatBox.scrollHeight;
        });


        document.getElementById('chat_message').addEventListener("keydown", (e) => {

            let msg = document.getElementById("chat_message");

            console.log(msg.value);
            if (e.key === 'Enter' && msg !== null && msg.value !== "") {
                socket.current.emit("message", { roomId: ROOM_ID, content: msg.value });
                let li = document.createElement("li");
                li.innerHTML = msg.value;
                li.style.backgroundColor = 'deepskyblue';
                li.style.color = 'white';
                li.style.padding='5px';
                li.style.marginLeft = "40%";
                li.style.marginBottom='10px';
                


                document.getElementById("liveMessage").append(li);
                var chatBox = document.getElementById("chatBox");
                chatBox.scrollTop = chatBox.scrollHeight;
                document.getElementById("chat_message").value = "";
                console.log(msg.value);



            }

        });

        socket.current.on('user-disconnected', userId => {
            if (peers.current[userId])
                peers.current[userId].close()
        })





    }, [])




    return (




        <div className="messenger">

            {/* <div className="chatMenu">
                <div className="chatMenuWrapper">
                
                </div>
            </div> */}


            <div className="chatBox" id="chatBox">

                <div className="chatBoxTop">
                    <ul className="messages" id="liveMessage"></ul>
                </div>

                <div className="chatBoxBottom">
                    
                    <input
                            type="text"
                            className="chatMessageInput"
                            id="chat_message"
                            placeholder="Type message here.."

                        />
                   

                </div>
            </div>




        </div>






    )
}

export default Room
