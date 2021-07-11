
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../Styles/CreateRoom.css'
function CreateRoom(props) {

    
   
   
    const history = useHistory();
    const makeRoom = (event) => {
        
        event.preventDefault();
        

        axios.post('/')
            .then(response => {
                if (response.data.success) {

                    
                      console.log(history);
                      
                      history.push(`/room/${response.data.roomId}`);
                   

                } else {
                    alert('No room available!')
                }

            })

            //  let bt = document.createElement("button");
            //     li.innerHTML = "Join-Video-Chat";
            //      li.href=`room/${roomId}`;
            //      li.onclick=()=>{ props.history.push(`/room/${roomId}`);}
            //     li.style.backgroundColor = 'blue';
            //     li.style.marginLeft = "100px";
            //     li.style.color = 'white';
            //     li.style.fontWeight = 'bold';
            //     console.log(li.href);
            //     document.getElementById("liveMessage").append(li);
            //     var chatWindow = document.getElementById("chatWindow");
            //     chatWindow.scrollTop = chatWindow.scrollHeight;
                 
            //     console.log(234);

    }


    return (
        <div className="container text-down text-center py-20 ">



            <form className="py-64" onSubmit={makeRoom} >
               
                    <br/>
                <input className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-6 px-4 rounded" type="submit" value="Create a new Room" />
                
            </form>
            {/* <div className="left">
            <div className="chatWindow" id="chatWindow">
                        <ul className="messages" id="liveMessage"></ul>

                    </div>
            </div>

            <div className="right">
                    
            </div> */}

            </div>

    )
}

export default CreateRoom