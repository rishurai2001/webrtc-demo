import React, { useEffect, useRef,useContext} from 'react'
import io from "socket.io-client";
import Peer from 'peerjs';
import '../Styles/Room.css'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";

function Room(props) {
    const { user } = useContext(AuthContext);
    console.log(user.username);
    const ROOM_ID = props.match.params.roomId;

    const myPeer = useRef();
    const socket = useRef();

    myPeer.current = new Peer();

    const videoGrid = useRef();
    const myVideoGrid = useRef();

    const peers = useRef({});
    const currentPeer = useRef();
    let myVideo;

    useEffect(() => {
        myVideo = document.createElement('video')
        myVideo.style.width = '30%'
        myVideo.style.height = '30%'
        myVideo.style.border = '2px solid'
        myVideo.style.margin = '10px'
           
        socket.current = io.connect("/Room");

        console.log('client side', myPeer.current);

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            //addVideoStream(myVideo, stream)
            addMyVideoStream(myVideo, stream)


            myPeer.current.on('call', call => {

                //When I get a call, I reply with my stream
                call.answer(stream)
                const video = document.createElement('video')
                video.style.width = '100%'
                video.style.height = '100%'
                video.style.margin = '5px'
                //When a call comes, I receive the incoming stream and create a video on my screen
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })

                call.on('close', () => {
                    video.remove()
                })

                peers.current[call.peer] = call
                currentPeer.current = call.peerConnection;

            })


            socket.current.on('user-connected', userId => {

                connectToNewUser(userId, stream)
            })
           
        })


        socket.current.on('user-disconnected', userId => {
            if (peers.current[userId])
                peers.current[userId].close()
        })
        socket.current.on('room-full',(msg)=>{
            console.log("room Full");
            // alert("Room that u are joing is full , Plaese try after some time");
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
                
                var chatBox = document.getElementById("chatWindow");
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        });

        myPeer.current.on('open', id => {
            socket.current.emit('join-room', ROOM_ID, id,user.username )
           
        })

        socket.current.on("createMessage", (msg,sender) => {
            console.log(msg);
            //alert(sender+"sent a messasge");
            // let sp = document.createElement("span");
            // sp.innerHTML = sender ;
            // sp.style.backgroundColor = 'green';
            // sp.style.marginLeft = "5px";
            
            let li = document.createElement("li");
            li.innerHTML =msg.content;
            li.style.backgroundColor = 'lavender';
            
             
            let divmsg = document.createElement("div");
            divmsg.style.backgroundColor='white';
            divmsg.style.marginLeft = "5px";
            divmsg.style.padding="5px";
            divmsg.innerHTML = "   "+sender+":" ;
            divmsg.style.width='fit-content';
            divmsg.style.borderRadius='5px';
            divmsg.style.marginTop='5px';
            divmsg.style.alignSelf='flex-start';
            divmsg.append(li);
            document.getElementById("liveMessage").append(divmsg);
           
            var chatWindow = document.getElementById("chatWindow");
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });


        document.getElementById('chat_message').addEventListener("keydown", (e) => {

            let msg = document.getElementById("chat_message");

            console.log(msg.value);
            if (e.key === 'Enter' && msg !== null && msg.value !== "") {
                socket.current.emit("message", { roomId: ROOM_ID, content: msg.value });
                let li = document.createElement("li");
                li.innerHTML = msg.value;
                li.style.backgroundColor = 'deepskyblue';
                li.style.marginLeft = "40%";
                li.style.color = 'white';
                li.style.fontWeight = 'bold';
                document.getElementById("liveMessage").append(li);
                var chatWindow = document.getElementById("chatWindow");
                chatWindow.scrollTop = chatWindow.scrollHeight;
                document.getElementById("chat_message").value = "";
                console.log(msg.value);



            }

        });




    }, [])

    function shareScreen() {
        {
            // @ts-ignore
            navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: 'always'
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            }).then(stream => {
                const videoTrack = stream.getVideoTracks()[0];
                videoTrack.onended = () => {
                    // this.stopScreenShare();
                };
                console.log(myPeer.current.id)

            });
        }
    }

    function connectToNewUser(userId, stream) {


        const call = myPeer.current.call(userId, stream)

        const video = document.createElement('video')
        video.style.width = '100%'
        video.style.height = '100%'
        // video.style.border = '2px solid'
        video.style.margin = '5px'



        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })

        call.on('close', () => {
            video.remove()
        })

        peers.current[userId] = call
    }

    function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        videoGrid.current.append(video)
    }
    function addMyVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        myVideoGrid.current.append(video)
    }
    window.onpopstate = () => {
        socket.current.close();
    }

    const playStop = () => {

        if(myVideo===null || myVideo.srcObject===null) {
            alert("Give camera access to this app and reload");
            return;
        }
        let enabled = myVideo.srcObject.getVideoTracks()[0].enabled;
        if (enabled) {
            myVideo.srcObject.getVideoTracks()[0].enabled = false;
            setPlayVideo();
        } else {

            myVideo.srcObject.getVideoTracks()[0].enabled = true;
            setStopVideo();
        }
    };
    // let stream = myVideo.srcObject;
    // const video = document.createElement('video')
    // video.style.width = '100%'
    // video.style.height = '100%'
    // video.style.margin = '5px'

    // navigator.mediaDevices.getDisplayMedia({
    //     audio:true,
    //     video:true
    // }).then(screenStream=>{
    //    //myVideo.srcObject=replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream);
    // //  myVideo.srcObject=null;
    //  let x=videoGrid[0];
    //  addVideoStream(video,screenStream);

    // //console.log(screenStream);



    const muteUnmute = () => {
        if(myVideo===null || myVideo.srcObject===null) {
            alert("Give Mic access to this app and reload");
            return;
        }

        const enabled = myVideo.srcObject.getAudioTracks()[0].enabled;
        if (enabled) {
            myVideo.srcObject.getAudioTracks()[0].enabled = false;
            setUnmuteButton();
        } else {
            setMuteButton();
            myVideo.srcObject.getAudioTracks()[0].enabled = true;
        }

    };
    const setPlayVideo = () => {
        const html = `<i class="unmute bi bi-camera-video-off"></i> `;
        document.getElementById("playPauseVideo").innerHTML = html;
    };

    const setStopVideo = () => {
        const html = `<i class=" bi bi-camera-video"></i> `;
        document.getElementById("playPauseVideo").innerHTML = html;
    };

    const setUnmuteButton = () => {
        const html = `<i class="bi bi-mic-mute"></i> `;
        document.getElementById("muteButton").innerHTML = html;
    };
    const setMuteButton = () => {
        const html = `<i class="bi bi-mic"></i>`;
        document.getElementById("muteButton").innerHTML = html;
    };
    return (
        <div className="roomScreen" >

            <div className="videoChatBlock">
                <div ref={videoGrid} className="videoGrid" ></div>
                <div ref={myVideoGrid} className="myVideoGrid" ></div>
                <div className="mainControlsBlock">
                    <div
                        className="mainControlsButton"
                        id="muteButton"
                        onClick={muteUnmute}
                    >
                        <i className="bi bi-mic-fill">

                        </i>

                    </div>
                    <div
                        className="mainControlsButton"
                        id="playPauseVideo"
                        onClick={playStop}
                    >
                        <i className="bi bi-camera-video-fill">

                        </i>


                    </div>
                    <div
                        className="mainControlsButton"
                        id="shareScreen"
                        onClick={shareScreen}
                    >
                        <i class="bi bi-cast">

                        </i>
                    </div>
                    <div className="mainControlsButton"
                        id="leaveMeeting" >
                        <a href='/'>

                            <i class="bi bi-telephone-fill" style={{ color: 'red' }}  ></i>

                        </a>
                    </div>

                </div>


            </div>

            <div className="chatBlock">
                <button className="mainControlsButton "
                    id="chatBoxIcon"
                // onClick={() => { document.getElementById('myModal').style.display = "block"; }}
                >
                    <i class="bi bi-chat-fill"></i>
                </button>

                <div id="myModal">

                    <span className="close" >
                        {/* onClick={() => { document.getElementById('myModal').style.display = "none"; }}>&times; */}
                    </span>

                    <div className="header">
                        <h6>LiveChat</h6>
                    </div>

                    <div className="chatWindow" id="chatWindow">
                        <ul className="messages" id="liveMessage"></ul>

                    </div>

                    <div className="messageContainer">
                        <input
                            type="text"
                            id="chat_message"
                            placeholder="Type message here.."

                        />
                    </div>

                </div>

            </div>




        </div>
    )
}

export default Room
