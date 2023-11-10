import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function getUser(username) {
  try {
    const { data } = await axios.get(`/user/${username}`);
    return data;
  } catch (error) {
    return { error };
  }
}

export async function verifyPass({ username, password }) {
  try {
    const { data } = await axios.post(`/login`, { username, password });
    return data;
  } catch (error) {
    return { error };
  }
}

export async function register({ username, email, password, pic }) {
  try {
    const { data, status } = await axios.post(`/register`, {
      username,
      email,
      password,
      pic,
    });
    if (status === 200) {
      const data = await axios.post(`/registerMail`, {
        username,
        userEmail: email,
        text: "User has been registered successfully.",
        subject: "Registration successful",
      });
    }
    return data;
  } catch (error) {
    return { error };
  }
}

export async function updateProfile({
  firstname,
  lastname,
  mobile,
  email,
  address,
  pic,
}) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `/update`,
      {
        firstname,
        lastname,
        mobile,
        email,
        address,
        pic,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    return { error };
  }
}

export async function getOTP(username) {
  try {
    const token = localStorage.getItem("token");
    const { data, status } = await axios.get(`/getOTP`);
    if (status === 200) {
      const getdata = await getUser(username);
      const result = await axios.post(`/registerMail`, {
        username,
        userEmail: getdata.email,
        text: `Your password reset OTP is ${data}`,
        subject: "Password reset OTP",
      });
    }
    return data;
  } catch (error) {
    return { error };
  }
}

export async function verifyOTP(otp) {
  try {
    const { data, status } = await axios.get(`/verifyOTP`, { params: { otp } });
    return { data, status };
  } catch (error) {
    return { error };
  }
}

export async function resetPass({ username, password, confPassword }) {
  try {
    const { data } = await axios.put(`/resetpass`, {
      username,
      pass: password,
      confpass: confPassword,
    });
    return data;
  } catch (error) {
    return { error };
  }
}
