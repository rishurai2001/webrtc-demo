import React, { useContext,useEffect } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  // const { user } = useContext(AuthContext);
   
  
  
  const listStyle = {
    background: 'deepSkyBlue',
    display: 'flex',
    padding: '10px 12px',
    borderRadius: '20px',
    // height:'7vh',
    fontSize:'80%',
    
  }
   
  //  const handleLogin=()=>{
    
    
  //      if(authenticate) {
        
  //        authenticate=false;
  //        localStorage.clear();
  //        console.log(localStorage);
        
  //        window.location.href="./"
  //       return;
  //      }
    
       
  //      else {
  //        console.log("login");
  //        window.location.href="./Login"
  //      }
     
   

  //  }
    const navStyle={
               display:'flex',
               backgroundColor:'rgba(9,40,68,255)',
               height:'10%',
               padding:'6px 12px',
               zIndex:'100',
               top:0,
               position:'fixed',
                
               
               
    }
    
    return (
       
        <nav className="  container mx-auto justify-between py-4" style={navStyle} >
            
            
         

            <Link to="/">
            <i class="bi bi-house-fill ml-10 text-5xl"></i>
              </Link>
           
           
            <ul className="flex items-center">
               

                <li className="mr-5 text-white" >
                  <Link to="/CreateRoom" style={listStyle} >CREATE A MEET </Link>
                </li>
                <li className="mr-5 text-white" >
                  <Link to="/JoinRoom" style={listStyle}  >JOIN A MEET</Link>
                </li>
                   <li className="mr-5 text-white" >
                  <Link to="/Chat" style={listStyle} >CHAT</Link>
               </li> 
                {/* <li className=" mr-10 text-white">
                  
                   <button id="button" onClick={handleLogin}  >
                     {user?
                      <div>
                        //<img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" style={{height:'50px',width:'50px',marginTop:'5px'}}/>
                        <i class="bi bi-person-circle " >
                        
                        </i><br/>Logout
                        
                      </div>:
                      <div>
                       <i class="bi bi-shield-lock"></i>
                        <br/> Login
                      </div>}
                   </button>
                   
                   
                </li> */}

            </ul>
                       
        </nav> 
       
    )
}
export default NavBar