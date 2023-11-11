import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/username.css";
import toast from "react-hot-toast";
import image from "../assets/images/profile.png";
import convertToBase64 from "../helper/convertImage";
import { AppContext } from "../context/appContext";
import { updateProfile } from "../helper/apiCall";

function Profile() {
  const navigate = useNavigate();
  const { userinfo } = useContext(AppContext);

  const [firstname, setFirstname] = useState(userinfo.firstname || "");
  const [lastname, setLastname] = useState(userinfo.lastname || "");
  const [mobile, setMobile] = useState(userinfo.mobile || "");
  const [email, setEmail] = useState(userinfo.email || "");
  const [address, setAddress] = useState(userinfo.address || "");
  const [profile, setProfile] = useState(userinfo.pic || "");
  const [bio, setBio] = useState(userinfo.bio || "");

  const btnClick = async () => {
    const data = await updateProfile({
      firstname,
      lastname,
      mobile,
      email,
      address,
      bio,
      pic: profile,
    });
    if (!data) {
      return toast.error("Unable to update user");
    } else {
      return toast.success(data);
    }
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setProfile(base64);
  };

  const logout = () => {
    localStorage.removeItem("token");
    return toast.success("Logged out successfully");
  };

  return (
    <section className="username-section flex-center">
      <h2>Profile</h2>
      <p className="username-small-text">You can update the details.</p>
      <div className="username-profile-cont">
        <label htmlFor="profile-pic">
          <img src={profile || image} alt="profile-pic" />
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
          value={firstname}
          placeholder="First Name"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <input
          type="text"
          className="username-input"
          required
          value={lastname}
          placeholder="Last Name"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
      </div>
      <div className="username-input-cont">
        <input
          type="text"
          className="username-input"
          required
          value={mobile}
          placeholder="Mobile No."
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
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
          type="text"
          className="username-input"
          required
          value={address}
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      {/* New Bio input */}
      <div className="username-input-cont">
        <textarea
          className="username-input"
          value={bio}
          placeholder="Short Bio (max 50 words)"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </div>
      <div className="username-btn-cont">
        <button className="username-btn" onClick={btnClick}>
          Update
        </button>
      </div>
      <p>
        Come back later?{" "}
        <NavLink to="/" className="username-register-link" onClick={logout}>
          Logout
        </NavLink>
      </p>
    </section>
  );
}

export default Profile;
