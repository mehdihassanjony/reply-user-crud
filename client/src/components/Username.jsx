import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/username.css";
import image from "../assets/images/profile.png";
import toast from "react-hot-toast";
import { getUser } from "../helper/apiCall";
import { AppContext } from "../context/appContext";

function Username() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [username, setUsername] = useState("");

  const btnClick = async () => {
    if (username === "") {
      return toast.error("Username should not be empty");
    } else {
      const data = await getUser(username);
      if (data.error) {
        return toast.error("Username not found");
      } else {
        setUser(username);
        return navigate("/password");
      }
    }
  };

  return (
    <section className="username-section flex-center">
      <h2>Hello Again!</h2>
      <p className="username-small-text">Explore more by connecting with us.</p>
      <div className="username-profile-cont">
        <img src={image} alt="profile-pic" />
      </div>
      <div className="username-input-cont">
        <input
          type="text"
          className="username-input"
          required
          value={username}
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="username-btn-cont">
        <button className="username-btn" onClick={btnClick}>
          Let's Go
        </button>
      </div>
      <p>
        Not a Member?{" "}
        <NavLink to="/register" className="username-register-link">
          Register Now
        </NavLink>
      </p>
    </section>
  );
}

export default Username;
