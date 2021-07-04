import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './Pages/Home'
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom.js';
import NavBar from './components/NavBar'
import Room from './components/Room'
import './App.css'


function App() {
  const room = () => (
    <div className="container">
      <Route exact path="/Room/:roomId" component={Room} />
    </div>
  )

  return (

    <div>

      <Switch>
        <Route exact path="/Room/:roomId" component={Room} />
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/CreateRoom" component={CreateRoom} />
          <Route exact path="/JoinRoom" component={JoinRoom} />
        </div>


      </Switch>
    </div>



  );
}

export default App;


