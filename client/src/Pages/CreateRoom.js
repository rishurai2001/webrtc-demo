
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

            
    }


    return (
        <div className="container text-down text-center py-20 ">



            <form className="py-64" onSubmit={makeRoom} >
               
                    <br/>
                <input className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-6 px-4 rounded" type="submit" value="Create a new Room" />
                
            </form>
           

            </div>

    )
}

export default CreateRoom