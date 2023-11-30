// import { createStore, combineReducers } from "redux";
// import letters from "redux/modules/letters";
// import member from "redux/modules/member";
// import { devToolsEnhancer } from "redux-devtools-extension";

// const rootReducer = combineReducers({ letters, member });

// const store = createStore(rootReducer, devToolsEnhancer());

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import letters from "../modules/letters";
import member from "../modules/member";
import isLogined from "../modules/authSlice";

const store = configureStore({
  reducer: { letters: letters, member: member, isLogined: isLogined },
});

export default store;
