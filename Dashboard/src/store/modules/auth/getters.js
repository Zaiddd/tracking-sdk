export default {
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  fullName(state) {
    return state.firstname + " " + state.lastname;
  },
  firstname(state) {
    return state.firstname;
  },
  roles(state) {
    return state.roles[0] === "Admin" ? "Admin" : "User";
  },
  email(state) {
    return state.email;
  },
  id(state) {
    return state.userId;
  },
};
