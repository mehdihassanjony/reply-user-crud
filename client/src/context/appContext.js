import { createContext, useReducer } from "react";
import reducer from "../reducer/reducer";

const AppContext = createContext();

const initialState = {
  username: "",
  userinfo: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (user) => {
    return dispatch({ type: "SET_USERNAME", payload: user });
  };

  const setUserInfo = (info) => {
    return dispatch({ type: "SET_USER_INFO", payload: info });
  };

  return (
    <AppContext.Provider value={{ ...state, setUser, setUserInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { AppContext };
