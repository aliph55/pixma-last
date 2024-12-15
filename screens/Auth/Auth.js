import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/User";
import { useWindowDimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Auth = () => {
  const navigation = useNavigation();

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "242071167183-v3cn2mh2870vrp39j4q5j37b5g5bfmds.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access). Required to get the `idToken` on the user object!
    iosClientId:
      "242071167183-gpgntbhflrba9lt1enf59f261qa4h2h2.apps.googleusercontent.com",
  });

  const dispatch = useDispatch();

  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.type === "success") {
              dispatch(logIn(userInfo));
              navigation.navigate("Home");
            }
            // console.log(JSON.stringify(userInfo));
            // console.log(userInfo);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log("cancelled", error);
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log(
                " operation (e.g. sign in) is in progress already",
                error
              );
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
              console.log(" play services not available or outdated ", error);
            } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
              console.log("SIGN_IN_REQUIRED ", error);
            } else {
              // some other error happened
              console.log("other ", error);
            }
          }
        }}
      />
    </View>
  );
};

export default Auth;
