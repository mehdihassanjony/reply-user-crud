import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/username.css";
import toast from "react-hot-toast";
import image from "../assets/images/profile.png";
import convertToBase64 from "../helper/convertImage";
import { register } from "../helper/apiCall";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const btnClick = async () => {
    if (username === "") {
      return toast.error("Username should not be empty");
    } else if (email === "") {
      return toast.error("Email should not be empty");
    } else if (username.length < 3) {
      return toast.error("Username must be at least 3 characters long");
    } else if (password === "") {
      return toast.error("Password should not be empty");
    } else if (password.length < 5) {
      return toast.error("Password should be at least 5 characters long");
    } else {
      const data = await register({ username, email, password, pic: file });
      if (!data) {
        return toast.error("Unable to register user");
      } else {
        toast.success(data);
        return navigate("/");
      }
    }
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <section className="username-section flex-center">
      <h2>Register</h2>
      <p className="username-small-text">Happy to join you!</p>
      <div className="username-profile-cont">
        <label htmlFor="profile-pic">
          <img src={file || image} alt="profile-pic" />
        </label>
        <input
          type="file"
          onChange={onUpload}
          name="profile-pic"
          id="profile-pic"
        />
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
      <div className="username-input-cont">
        <input
          type="email"
          className="username-input"
          required
          value={email}
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="username-input-cont">
        <input
          type="password"
          className="username-input"
          required
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="username-btn-cont">
        <button className="username-btn" onClick={btnClick}>
          Register
        </button>
      </div>
      <p>
        Already Registered?{" "}
        <NavLink to="/" className="username-register-link">
          Login Now
        </NavLink>
      </p>
    </section>
  );
}

export default Register;
