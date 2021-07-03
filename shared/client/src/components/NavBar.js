import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = () => {
    const navStyle={
              display:'flex',
               background:'white',
               height:'10%',
               padding:'6px 12px',
               position:'fixed'
               
    }
    const listStyle = {
      background: 'blue',
      display: 'flex',
      padding: '10% 12px',
      borderRadius: '20px',
      // height:'7vh',
      fontSize:'80%',
      
    }
    return (
      <>
        <nav className="  container mx-auto justify-between py-4" style={navStyle} >
            
            
            <Link to="/">
                <img className="ml-5 " style={{height:'50px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPaAbJZ-drUMdc8QH1pCxTYC6JEj_phuuQw&usqp=CAU"/>
            </Link>
           
           
            <ul className="flex items-center">
                <li className="ml-5 text-white" >
                  <Link to="/CreateRoom" style={listStyle} >CREATE A MEETING </Link>
                </li>
                <li className="ml-10 mr-10 text-white" >
                  <Link to="/JoinRoom" style={listStyle}  >JOIN A MEETING</Link>
                </li> 

            </ul>
                       
        </nav> 
        </>
    )
}
export default NavBar