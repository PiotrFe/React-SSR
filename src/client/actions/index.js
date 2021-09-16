export const FETCH_USERS = "fetch_users";
// third argument (api) gets submitted thanks to using thunk.withExtraArgument(axiosInstance) in client.js
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get("https://react-ssr-api.herokuapp.com/users");

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res,
  });
};

export const FETCH_ADMINS = "fetch_admins";
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get("/admins");

  dispatch({
    type: FETCH_ADMINS,
    payload: res,
  });
};
