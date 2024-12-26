import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Authenticated, NonAuthenticated } from "./MainContainer";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { auth } from "../redux/User";

const RootNavigation = () => {
  const dispatch = useDispatch();

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      // console.log("userInfo ", userInfo);

      if (userInfo?.type === "success") {
        dispatch(auth(userInfo?.data?.user));
      }

      if (userInfo?.data === undefined) {
        return;
      } else {
        // dispatch(auth(userInfo?.data?.user));
      }
      // console.log("userInfo ", userInfo?.data?.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log("error", error);
      } else {
        console.log("error", error);
      }
    }
  };

  const getCurrentUser = async () => {
    const currentUser = GoogleSignin.getCurrentUser();
    if (currentUser !== null) {
      //   dispatch(auth(currentUser?.data));
    }

    // console.log("currentUser ", currentUser?.user);
    if (currentUser?.type === "success") {
      dispatch(auth(currentUser?.user));
    }
  };

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const user = useSelector((state) => state.user);
  //   console.log("user ", user);
  return user.isLoggedIn ? <Authenticated /> : <NonAuthenticated />;
};

export default RootNavigation;
