import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("signup");

  const [data, setSData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const apiUrl =
      currState === "login"
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;

    const response = await axios.post(apiUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>

        <div className="login-popup-title">
          <h2>{currState === "login" ? "Login" : "Sign Up"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "signup" && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />

          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {currState === "signup" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "login" ? (
          <p>
            Create a new account?{" "}
            <button
              type="button"
              className="login-switch"
              onClick={() => setCurrState("signup")}
            >
              Click here
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="login-switch"
              onClick={() => setCurrState("login")}
            >
              Login here
            </button>
          </p>
        )}

      </form>
    </div>
  );
};

export default LoginPopup;
