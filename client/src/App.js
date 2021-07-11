import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Home from './Pages/Home'
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom.js';
import NavBar from './components/NavBar';
import Room from './components/Room';
import Chat from './Pages/Chat';
import ChatRoom from './components/ChatRoom';
import Login from './Pages/Login';
import './App.css';
import { AuthContext } from "./context/AuthContext";
import Register from "./Pages/Register";
import { withRouter } from "react-router";
function App( props) {
  
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(user);
  function alertUser() {
    alert("Please Login");
  }
  return (

    

    <Router>
      <Switch>
        
      {!user && <Route path="/" >{alertUser}<Login/><Home/><NavBar/></Route>}
        <Route exact path="/Room/:roomId" component={Room} />
       
        {/* <Route exact path="/Room/:roomId">{user ? <Room props={this.props}/>: <Login /> }</Route> */}
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          {/* //<Route exact path="/CreateRoom" component={CreateRoom} /> */}
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
          </Route>
         
          <Route exact path="/CreateRoom"> {user ? <CreateRoom  />:<Login/>}</Route>
          <Route exact path="/JoinRoom" component={JoinRoom} />
          <Route exact path="/Chat" component={Chat} />
          <Route exact path="/Chat/:roomId" component={ChatRoom} />
        </div>
      </Switch>
     </Router>
    
    // < Router >
    // <Switch>
    // <div><Route exact path="/Room/:roomId"  component= {Room} />  </div>
    //   <div>  
    //     <NavBar />

         
    //     <Route exact path="/" component={Home} />
    //     <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
    //     <Route path="/register">
    //       {user ? <Redirect to="/" /> : <Register />}
    //     </Route>
    //     <Route exact path="/CreateRoom"> {user ? <CreateRoom/>:<Login/>}</Route>
    //     <Route exact path="/Chat/:roomId" component={ChatRoom} />
    //     </div>


        
    // </Switch> 
    //  </Router >

  


  );
}

export default  App;


