export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.refreshToken = payload.refreshToken;
    state.firstname = payload.firstname;
    state.lastname = payload.lastname;
    state.email = payload.email;
    state.roles = payload.roles;
    state.userId = payload.userId;
  },
};
