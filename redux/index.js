import { configureStore } from "@reduxjs/toolkit";
import User from "./User";
import Categories from "./Categories";
import Donations from "./Donations";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: User,
    categories: Categories,
    donations: Donations,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
