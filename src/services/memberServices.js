import { useDispatch } from "react-redux";
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
      // const dispatch = useDispatch()
      console.log(res.status);
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
