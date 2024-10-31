export const selectUserData = (state) => state.user.user;
export const selectUserTabs = (state) => state.user.tabs;
export const selectUserRequestData = (state) => {
  return {
    id: state.user.user.id,
    company_id: state.user.user.company_id,
    auth_token: state.user.user.auth_token,
  };
};