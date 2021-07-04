
import axios from 'axios'
import { useState } from 'react'

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



            <form className="ml-30 py-64" onSubmit={makeRoom} >
                {/* <input  className="border rounded w-1/3 py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"

                    placeholder='Enter your Name'
                    onChange={e => {
                        const newID = e.target.value;
                        setName(newID); // Now it works
                    }
                    } 
                    required/> */}
                    <br/>
                <input className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-6 px-4 rounded" type="submit" value="Create a new Room" />
                
            </form>

        </div>

    )
}

export default CreateRoom