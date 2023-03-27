import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import addCarsReducer from "./Features/addCars";
import usersReducer from "./Features/User";

// // ----------------- import for encript data ---------------------
// import { encryptTransform } from 'redux-persist-transform-encrypt'

// //=================================
//  //  Encription for persistState
// // =================================

// const encryptor = encryptTransform({
//     secretKey: '123456',
//     onError: (err) => {
//       console.log('err', err)
//     },
//   })

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  //  //  ________ For encription over state _______
  //   keyPrefix: 'redux-',
  //   transforms: [encryptor],
};

const rootReducer = combineReducers({
  users: usersReducer,
  cars: addCarsReducer,
});

export { rootPersistConfig, rootReducer };
