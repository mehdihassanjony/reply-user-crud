const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_USER_INFO":
      return { ...state, userinfo: action.payload };

    default:
      return state;
  }
};

export default reducer;
