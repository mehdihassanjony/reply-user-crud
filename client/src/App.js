import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Username from "./components/Username";
import Register from "./components/Register";
import Password from "./components/Password";
import Recovery from "./components/Recovery";
import { Toaster } from "react-hot-toast";
import Reset from "./components/Reset";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import { AuthToken, AuthPass } from "./middleware/auth";

function App() {
  return (
    <Router>
      <Toaster
        toastOptions={{
          success: {
            style: {
              color: "green",
            },
          },
          error: {
            style: {
              color: "red",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/password"
          element={
            <AuthPass>
              <Password />
            </AuthPass>
          }
        />
        <Route path="/recover" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route
          path="/profile"
          element={
            <AuthToken>
              <Profile />
            </AuthToken>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
