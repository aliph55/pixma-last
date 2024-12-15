import { Provider } from "react-redux";
import store from "./redux";

import { Text } from "react-native";
import MainContainer from "./MainContainer";

export default function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}
// options={{
//   // header: () => null,
//   headerShown: false,
// }}
