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
function App() {

 
  
 
  return (



    <Router>
      <Switch>
        

        <Route exact path="/room/:roomId" component={Room} />
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
           

          <Route exact path="/CreateRoom"> <CreateRoom /> </Route>
          <Route exact path="/JoinRoom"> <JoinRoom /> </Route>
          <Route exact path="/Chat" component={Chat} />
          <Route exact path="/Chat/:roomId" component={ChatRoom} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;


