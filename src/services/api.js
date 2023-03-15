import axios from "axios";
import TokenService from "./tokenService";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://backend-mo-t.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 403 || !originalConfig.__isRetryRequest) {
        originalConfig.__isRetryRequest = true;
        return err.response;
      }

      try {
        const rs = await instance.post("api/user/token", {
          refreshToken: TokenService.getLocalRefreshToken(),
        });
        console.log(rs);
        const { accessToken } = rs.data;
        TokenService.updateNewAccessToken(accessToken);
      } catch (_error) {
        if (_error.response.status === 401) {
          return _error.response;
        }
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
