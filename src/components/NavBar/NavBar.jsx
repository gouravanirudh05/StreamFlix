import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import search from "../../assets/search_icon.svg";
import bell from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import drop_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";

const NavBar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // Notifications dropdown
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Profile dropdown
  const [notifications, setNotifications] = useState([]); // Notifications array

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className="navbar-left-ul">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tv-shows">TV Shows</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/new-and-popular">New and Popular</Link></li>
          <li><Link to="/my-list">My List</Link></li>
          <li><Link to="/browse-languages">Browse by Languages</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <img
            src={search}
            alt="search"
            className="icons"
            onClick={() => setShowSearch(!showSearch)}
          />
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder="Search for movies, shows, people, etc..."
              value=""
              onChange={(e) => {}}
            />
          )}
        </div>
        <p>Children</p>
        <img
          src={bell}
          alt="bell"
          className="icons"
          onClick={() => setShowNotifications(!showNotifications)}
        />
        {showNotifications && (
          <div className="notification-dropdown">
            {notifications.length === 0 ? (
              <p className="no-notifications">No recent notifications</p>
            ) : (
              <ul className="notification-list">
                {notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div
          className="navbar-profile"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <img src={profile_img} alt="profile" className="profile" />
          <img src={drop_icon} alt="drop" />
        </div>
        {showProfileDropdown && (
          <div className="profile-dropdown">
            <ul>
              <li>
                <img src={profile_img} alt="Children" className="dropdown-icon" />
                <span>Children</span>
              </li>
              <li>
                <i className="dropdown-icon pencil-icon"></i>
                <span>Manage Profiles</span>
              </li>
              <li>
                <i className="dropdown-icon transfer-icon"></i>
                <span>Transfer Profile</span>
              </li>
              <li>
                <i className="dropdown-icon account-icon"></i>
                <span>Account</span>
              </li>
              <li>
                <i className="dropdown-icon help-icon"></i>
                <span>Help Centre</span>
              </li>
              <li className="sign-out" onClick={() => logout()}>
                Sign out of Netflix
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
