import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Alert } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import Header from "../../components/Header/Header";
import style from "./style";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import {
  CardForm,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "../../constants/App";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Payment = ({ navigation }) => {
  const donationItemInformation = useSelector(
    (state) => state.donations.selectedDonationInformation
  );

  const [isReady, setIsReady] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();
  // const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState();

  const getCurrentUserInfo = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        setUserInfo({ currentUser });
      }
      // dispatch(logIn(userInfo));
      if (userInfo.type === "success") {
      }
    } catch (error) {
      // console.log(error);
    }
  };
  // console.log(userInfo?.currentUser?.user?.email);
  useEffect(() => {
    getCurrentUserInfo();
  }, []);
  // userInfo?.currentUser?.user?.email
  //Make sure to start your local server with nodemon index.js before running this, otherwise your local server will not receive your requests
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      "https://server-1-jreb.onrender.com/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo?.currentUser?.user?.email,
          currency: "usd",
          amount: donationItemInformation.price * 100,
        }),
      }
    );
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
    });
    if (error) {
      Alert.alert(
        "Error has occured with your payment",
        error.localizedMessage
      );
    } else if (paymentIntent) {
      Alert.alert("Successful", "The payment was confirmed successfully!");
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <Header title={"Making Donation"} />
        <Text style={style.donationAmountDescription}>
          You are about to donate {donationItemInformation.price}
        </Text>
        <View>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <CardForm
              style={style.cardForm}
              onFormComplete={() => {
                setIsReady(true);
              }}
            />
          </StripeProvider>
        </View>
      </ScrollView>
      <View style={style.button}>
        <Button
          title={"Donate"}
          isDisabled={!isReady || loading}
          onPress={async () => await handlePayment()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
