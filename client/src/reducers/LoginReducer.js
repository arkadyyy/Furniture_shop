export const LoginReducer = (
  state = { userData: {}, isAdmin: false, userLogged: false },
  action
) => {
  switch (action.type) {
    case "LOG_IN_ADMIN":
      return {
        ...state,
        isAdmin: true,
        userLogged: false,
        userData: action.payload,
      };
    case "LOG_IN_USER":
      return {
        ...state,
        isAdmin: false,
        userLogged: true,
        userData: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        userData: action.payload,
      };
    case "LOG_OUT_USER":
      return {
        ...state,
        isAdmin: false,
        userLogged: false,
        userData: {},
      };
    default:
      return state;
  }
};
