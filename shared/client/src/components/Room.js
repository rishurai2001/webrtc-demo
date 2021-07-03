import React, { useEffect, useRef } from 'react'
import io from "socket.io-client";
import Peer from 'peerjs';




function Room(props) {

    const ROOM_ID = props.match.params.roomId

    const myPeer = useRef();
    const socket = useRef();

    myPeer.current = new Peer();

    const videoGrid = useRef();
    const myVideoGrid = useRef();

    const peers = useRef({});
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

            })


            socket.current.on('user-connected', userId => {

                connectToNewUser(userId, stream)
            })
        })


        socket.current.on('user-disconnected', userId => {
            if (peers.current[userId]) peers.current[userId].close()
        })

        myPeer.current.on('open', id => {
            socket.current.emit('join-room', ROOM_ID, id)
        })

        socket.current.on("createMessage", (msg) => {
            console.log(67);
            let li = document.createElement("li");
            li.innerHTML = msg;
            li.style.backgroundColor='blue';
            document.getElementById("all_messages").append(li);
            var chatWindow = document.getElementById("chatWindow");
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });


        document.getElementById('chat_message').addEventListener("keydown", (e) => {

            let msg = document.getElementById("chat_message");

            console.log(msg.value);
            if (e.key === 'Enter' && msg !== null && msg.value !== "") {
                socket.current.emit("message", msg.value);
                let li = document.createElement("li");
                li.innerHTML = msg.value;
                li.style.backgroundColor='red';
                document.getElementById("all_messages").append(li);
                var chatWindow = document.getElementById("chatWindow");
                chatWindow.scrollTop = chatWindow.scrollHeight;
                document.getElementById("chat_message").value = "";
                console.log(msg.value);



            }

        });



    }, [])


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
        let enabled = myVideo.srcObject.getVideoTracks()[0].enabled;
        if (enabled) {
            myVideo.srcObject.getVideoTracks()[0].enabled = false;
            setPlayVideo();
        } else {

            myVideo.srcObject.getVideoTracks()[0].enabled = true;
            setStopVideo();
        }
    };
    function shareScreen() {
        let stream = myVideo.srcObject;

        navigator.mediaDevices.getDisplayMedia({ cursor: true })
            .then(screenStream => {

                myVideo.srcObject.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream);
                console.log(myPeer.current);
                //   myVideo.srcObject=screenStream
                //   screenStream.getTracks()[0].onended = () =>{
                //   myPeer.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
                //   myVideo.srcObject=stream
                //   }
            })
    }

    const muteUnmute = () => {

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
                    onClick={() => { document.getElementById('myModal').style.display = "block"; }}>
                    <i class="bi bi-chat-fill"></i>
                </button>

                <div id="myModal">

                    <span className="close" onClick={() => { document.getElementById('myModal').style.display = "none"; }}>&times;</span>

                    <div className="header">
                        <h6>LiveChat</h6>
                    </div>

                    <div className="chatWindow" id="chatWindow">
                        <ul className="messages" id="all_messages"></ul>
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
