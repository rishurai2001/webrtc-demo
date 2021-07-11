import { useContext, useRef } from "react";
import {Link} from 'react-router-dom';
import "../Styles/Login.css";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";

const Login = () => { 
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
     
    console.log("loged in") 
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Video-Engage-App</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <div></div>
              ) : (
                "Log In"
              )}
            </button>
            {/* <span className="loginForgot">Forgot Password?</span> */}
            
            <button className="loginRegisterButton" >
              {isFetching ? (
                <></>
              ) : (
                <Link to="/register" >Create a New Account </Link>
              )} 
            </button>
           
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default   Login 