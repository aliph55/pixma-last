import SingleDonationItem from "../screens/SingleDonationItem/SingleDonationItem";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import Payment from "../screens/Payment/Payment";
import Auth from "../screens/Auth/Auth";

const Stack = createStackNavigator();

const NonAuthenticated = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerLeft: null,
            // headerShown: false,
            title: "Auth",
          }}
          name="Auth"
          component={Auth}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Authenticated = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen
          name="SingleDonationItem"
          component={SingleDonationItem}
        />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { NonAuthenticated, Authenticated };
