const reducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_NEW":
      return { ...state, userCount: state.userCount + 1 };
    case "SET_PEOPLE_COUNT":
      return { ...state, userCount: action.payload };
    case "USER_LOGIN":
      return { ...state, ...action.payload };
    case "USER_IMAGE_UPDATED":
      const userInfo = {...state.userInfo,image: action.payload}
      return { ...state, image : action.payload};
    case "SIGNUP_FORM":
      console.log(action.payload)
      return
    default:
      return state;
  }
};
export default reducer;
