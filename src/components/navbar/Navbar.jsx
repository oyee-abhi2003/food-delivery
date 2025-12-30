import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom"; // 👈 useNavigate
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);

  const { token, setToken, cartItems } = useContext(StoreContext);
  const navigate = useNavigate(); // 👈 initialize

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProfileOpen(false);
    navigate("/"); // optional
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href="#explore-menu">Menu</a>
        <a href="#app-download">Mobile App</a>
        <a href="#footer">Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {Object.keys(cartItems).length > 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt=""
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myorders")}> {/* 👈 FIX */}
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
