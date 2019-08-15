const reducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_NEW":
      return { ...state, userCount: state.userCount + 1 };
    case "SET_PEOPLE_COUNT":
      return { ...state, userCount: action.payload };
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};
export default reducer;
