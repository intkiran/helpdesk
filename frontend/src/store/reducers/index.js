// combine all reducers

import { combineReducers } from "redux";
import AuthReducer from "./auth";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const appReducer = combineReducers({
  auth: AuthReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: []
};

const reducers = persistReducer(persistConfig, rootReducer);

export default reducers;
