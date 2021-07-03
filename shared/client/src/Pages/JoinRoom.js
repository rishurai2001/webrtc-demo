import React, {useState} from 'react'

const JoinRoom = (props) => {
    const [roomID, setroomID] = useState('');
    
   const buttonStyle={
       color:'red',
       height:'10px',
       weight:'10px',
       backgroundColor:'black'
   }

    const joinRoom=()=>{
        
        props.history.push(`/room/${roomID}`);
       
    }
   
    return (
       
            
             <div className="container text-down text-center py-20 ">
                  
                    
                    <form class="ml-30 py-10">
                        <input className="border rounded w-1/3 py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  
                        value={roomID} required 
                        placeholder='Enter Room ID to join'
                        onChange={e => {
                        const newID = e.target.value ;
                        setroomID(newID); // Now it works
                        }
                    } />
                   
   

                       <br/><br/>

                        <button  className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-6 px-4 rounded" onClick={joinRoom} type="submit" style={{ marginLeft: '5px' }}>Join a new room</button>
                    </form>
                    
                </div>
        
    )
}

export default JoinRoom
