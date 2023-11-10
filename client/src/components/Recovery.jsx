import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/username.css";
import toast from "react-hot-toast";
import { getOTP, verifyOTP } from "../helper/apiCall";
import { AppContext } from "../context/appContext";

function Recovery() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { username } = useContext(AppContext);
  const btnClick = async (e) => {
    e.preventDefault();
    if (otp === "") {
      return toast.error("OTP should not be empty");
    }
    const { data, status } = await verifyOTP(otp);
    if (status !== 200) {
      return toast.error("Incorrect OTP");
    } else {
      toast.success("OTP verified successfully");
      return navigate("/reset");
    }
  };

  const callGetOTP = async () => {
    await getOTP(username);
  };

  const resendOTP = (e) => {
    e.preventDefault();
    callGetOTP();
  };

  useEffect(() => {
    callGetOTP();
  }, [username]);

  return (
    <section className="username-section flex-center">
      <h2>Recover Password</h2>
      <p className="username-small-text">
        Enter 6 digit OTP sent to your email address.
      </p>
      <div className="username-input-cont">
        <input
          type="text"
          className="username-input"
          required
          value={otp}
          placeholder="OTP"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </div>
      <div className="username-btn-cont">
        <button className="username-btn" onClick={btnClick}>
          Recover
        </button>
      </div>
      <p>
        Can't get OTP?{" "}
        <button className="username-register-link" onClick={resendOTP}>
          Resend
        </button>
      </p>
    </section>
  );
}

export default Recovery;
