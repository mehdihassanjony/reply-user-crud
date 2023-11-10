import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

export function AuthToken({ children }) {
  const { username } = useContext(AppContext);
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  } else {
    const decoded = jwt_decode(token);
    if (decoded.username === username) {
      return children;
    } else {
      return <Navigate to={"/"} replace={true}></Navigate>;
    }
  }
}

export function AuthPass({ children }) {
  const { username } = useContext(AppContext);
  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  } else {
    return children;
  }
}
