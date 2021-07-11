import React, { useEffect, useRef } from 'react'
import io from "socket.io-client";
import Peer from 'peerjs';
import '../Styles/ChatRoom.css'



function Room(props) {

    const ROOM_ID = props.match.params.roomId

    const myPeer = useRef();
    const socket = useRef();

    myPeer.current = new Peer();



    const peers = useRef({});


    useEffect(() => {


        socket.current = io.connect("/Room");

        console.log('client side', myPeer.current);


        myPeer.current.on('open', id => {
            socket.current.emit('message-room', ROOM_ID, id)

        })

        socket.current.on("init", (msg) => {
            console.log(msg);
            for (let i =  msg.length-1; i>=0; i--) {
               
                let sp = document.createElement("span");
                let time=msg[i].createdAt;
                sp.innerHTML=time.slice(0,9)+" "+ time.slice(12,16);
                sp.style.fontSize='8px';
    
                let li = document.createElement("li");
              
                li.innerHTML =msg[i].content; 
                li.style.backgroundColor = 'lavender';
                li.style.margin='5px';
                

                let divmsg = document.createElement("div");
                divmsg.style.backgroundColor='white';
                divmsg.style.marginLeft = "5px";
                divmsg.style.padding="2px";
                // divmsg.innerHTML =time.slice(12,16);
                divmsg.style.width='fit-content';
                divmsg.style.borderRadius='5px';
                divmsg.style.marginTop='5px';
                divmsg.style.alignSelf='flex-start';
                divmsg.style.textAlign='end';

                divmsg.append(li,sp);

                document.getElementById("liveMessage").append(divmsg);

                // document.getElementById("liveMessage").append(sp);
                // document.getElementById("liveMessage").append(li);
                
                var chatBox = document.getElementById("chatBox");
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        });



        socket.current.on("createMessage", (msg) => {
            console.log(67);
            let li = document.createElement("li");
            li.innerHTML = msg.content;
            li.style.backgroundColor = 'lavender';
            document.getElementById("liveMessage").append(li);
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
                li.style.backgroundColor = 'blue';

                li.style.color = 'white';



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
                    <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        id="chat_message"
                    ></textarea>
                    {/* <button className="chatSubmitButton"  >
                        Send
                    </button> */}

                </div>
            </div>




        </div>






    )
}

export default Room
