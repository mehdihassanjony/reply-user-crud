import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/username.css";
import image from "../assets/images/profile.png";
import toast from "react-hot-toast";
import { verifyPass } from "../helper/apiCall";
import { AppContext } from "../context/appContext";
import { getUser } from "../helper/apiCall";

function Password() {
  const navigate = useNavigate();
  const { username, setUserInfo } = useContext(AppContext);
  const [password, setPassword] = useState("");

  const btnClick = async () => {
    if (password === "") {
      return toast.error("Password should not be empty");
    } else if (password.length < 5) {
      return toast.error("Password should be atleast 5 characters long");
    } else {
      const data = await verifyPass({ username, password });
      if (!data) {
        return toast.error("Incorrect Password");
      } else {
        const userInfo = await getUser(username);
        setUserInfo(userInfo);
        localStorage.setItem("token", data.token);
        toast.success(data.msg);
        return navigate("/profile");
      }
    }
  };

  return (
    <section className="username-section flex-center">
      <h2>Hello {username || "Again"}!</h2>
      <p className="username-small-text">Explore more by connecting with us.</p>
      <div className="username-profile-cont">
        <img src={image} alt="profile-pic" />
      </div>
      <div className="username-input-cont">
        <input
          type="password"
          className="username-input"
          required
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="username-btn-cont">
        <button className="username-btn" onClick={btnClick}>
          Login
        </button>
      </div>
      <p>
        Forgot Password?{" "}
        <NavLink to="/recover" className="username-register-link">
          Recover Now
        </NavLink>
      </p>
    </section>
  );
}

export default Password;
