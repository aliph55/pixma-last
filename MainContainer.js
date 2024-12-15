import Payment from "./screens/Payment/Payment";
import Home from "./screens/Home/Home";
import Auth from "./screens/Auth/Auth";
import SingleDonationItem from "./screens/SingleDonationItem/SingleDonationItem";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen
          name="SingleDonationItem"
          component={SingleDonationItem}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
