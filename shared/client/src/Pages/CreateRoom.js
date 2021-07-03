 
import axios from 'axios'


function CreateRoom(props) {
    
    
    
        const makeRoom = (event) => {
            event.preventDefault();
           
    
            axios.post('/')
                .then(response => {
                    if (response.data.success) {
                        props.history.push(`/room/${response.data.roomId}`);
    
                    } else {
                        alert('No room available!')
                    }
    
                })
    
        }
    
       
        return (
            <div className="container text-down text-center py-20 ">
                           

                
                    <form class="ml-30 py-10" >
                       <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-6 px-4 rounded" onClick={makeRoom} type="submit" style={{ marginLeft: '5px' }}>Create a new room</button>
                    </form>
    
                </div>
    
        )
    }
    
    export default CreateRoom