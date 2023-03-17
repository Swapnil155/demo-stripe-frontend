import api from "./api";

const addMember = async (_id, ownerName, age, gender, registration) => {
  // console.log(_id, ownerName, age, gender, registration);
  return api
    .patch(`/api/user/member/${_id}`, {
      ownerName,
      age,
      gender,
      registration,
    })
    .then((res) => {
      console.log(res.data);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const MemberServices = {
  addMember,
};

export default MemberServices;
