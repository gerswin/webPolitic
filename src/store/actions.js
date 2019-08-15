export const newUser = () => ({
  type: "USER_NEW"
});

export const loginUser = payload => ({
  type: "USER_LOGIN",
  payload
});
export const setUserImage = payload => ({
  type: "USER_IMAGE",
  payload
});
export const setPeopleCount = payload => ({
  type: "SET_PEOPLE_COUNT",
  payload
});


export const signUpForm = payload => ({
  type: "SIGNUP_FORM",
  payload
});
