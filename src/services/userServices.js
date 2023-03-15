import api from "./api";

const userLogin = async (email, password) => {
//   console.log(email, password);
  try {
    const login = await api.post(`/api/user/login`, {
      email,
      password,
    });
    console.log(login);
    return login;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const userRegister = async (name, mobileNumber, email, password) => {
  //   console.log(email, password);
  try {
    const register = await api.post(`/api/user/register`, {
      name,
      mobileNumber,
      email,
      password,
    });
    console.log(register);
    return register;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const UserServices = {
  userLogin,
  userRegister,
};

export default UserServices;
