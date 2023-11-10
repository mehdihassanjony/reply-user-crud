import React, { useContext, useState } from "react";
import "../styles/username.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPass } from "../helper/apiCall";
import { AppContext } from "../context/appContext";

function Reset() {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();
  const { username } = useContext(AppContext);

  const btnClick = async () => {
    if (password === "" || confPassword === "") {
      return toast.error("Password cannot be empty");
    } else if (password !== confPassword) {
      return toast.error("Passwords did not match");
    } else if (password.length < 5) {
      return toast.error("Password must be at least 5 characters long");
    } else {
      const data = await resetPass({ username, password, confPassword });
      if (!data) {
        return toast.error("Unable to reset password");
      } else {
        toast.success("Password reset successful");
        return navigate("/");
      }
    }
  };

  return (
    <section className="username-section flex-center">
      <h2>Reset</h2>
      <p className="username-small-text">Enter new password.</p>
      <div className="username-input-cont">
        <input
          type="text"
          className="username-input"
          required
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="username-input-cont">
        <input
          type="text"
          className="username-input"
          required
          value={confPassword}
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfPassword(e.target.value);
          }}
        />
      </div>
      <div className="username-btn-cont">
        <button className="username-btn" onClick={btnClick}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default Reset;
