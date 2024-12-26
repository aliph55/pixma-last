import { Provider } from "react-redux";
import store from "./redux";

import { Text } from "react-native";
// import MainContainer from "./navigation/MainContainer";
import RootNavigation from "./navigation/RootNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
// options={{
//   // header: () => null,
//   headerShown: false,
// }}
