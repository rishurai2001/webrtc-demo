import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './Pages/Home'
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom.js';
import NavBar from './components/NavBar'
import Room from './components/Room'
import './App.css'


function App() {
  return (


    <div>


      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/CreateRoom" component={CreateRoom} />
        <Route exact path="/JoinRoom" component={JoinRoom} />
        <Route exact path="/Room/:roomId" component={Room} />

      </Switch>



    </div>
  );
}

export default App;


