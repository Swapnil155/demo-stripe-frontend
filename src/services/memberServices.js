import { useDispatch } from "react-redux";
import api from "./api";

const addMember = async (_id, ownerName, age, gender, registrationNumber) => {
  // console.log(_id, ownerName, age, gender, registration);
  return api
    .patch(`/api/user/AddMember/${_id}`, {
      ownerName,
      age,
      gender,
      registrationNumber,
    })
    .then((res) => {
      // const dispatch = useDispatch()
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const removeMember = async (_id, registrationNumber) => {
  // console.log(_id, ownerName, age, gender, registration);
  return api
    .patch(`/api/user/removeMember/${_id}`, {
      registrationNumber,
    })
    .then((res) => {
      // const dispatch = useDispatch()
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const editMember = async (_id, ownerName, age, gender) => {
  console.log(_id, ownerName, age, gender);
  return api
    .patch(`/api/user/editMember/${_id}`, {
      ownerName,
      age,
      gender,
    })
    .then((res) => {
      // const dispatch = useDispatch()
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const MemberServices = {
  addMember,
  removeMember,
  editMember,
};

export default MemberServices;
