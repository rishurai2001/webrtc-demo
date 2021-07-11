import React, { useState } from 'react'


const Chat = (props) => {
    const [roomID, setroomID] = useState('');


    const joinChat = () => {

        props.history.push(`/Chat/${roomID}`);

    }

    return (
        <>




            <div className="container text-down text-center py-20 ">


                <form class="ml-30 py-64" onSubmit={joinChat}>
                    <input className="border rounded w-1/3 py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                        value={roomID} required
                        placeholder='Enter Room ID to join chat'
                        onChange={e => {
                            const newID = e.target.value;
                            setroomID(newID); // Now it works
                        }
                        } />


                    <br /><br />
                    <input className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-6 px-4 rounded" type="submit" value="Join a Room" />

                </form>

            </div>
        </>

    )
}

export default Chat