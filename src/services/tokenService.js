const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
};

const updateNewAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const updateUserInfo = (data) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.userData = data;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (userdata) => {
  const { user, refreshToken, message, accessToken } = userdata;
  const data = {
    user: user,
    refreshToken,
    message,
    accessToken,
    isAuthenticate: true,
  };
  console.log(data);
  localStorage.setItem("user", JSON.stringify(data));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const isAuthenticateFailed = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.isAuthenticate = false;
  localStorage.setItem("user", JSON.stringify(user));
};

const TokenService = {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateNewAccessToken,
  updateUserInfo,
  getUser,
  setUser,
  removeUser,
  isAuthenticateFailed,
};

export default TokenService;
