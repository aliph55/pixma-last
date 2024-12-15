import { AntDesign } from "@expo/vector-icons";

import style from "./style";
import { Pressable } from "react-native";

const BackButton = ({ onPress }) => {
  return (
    <Pressable onPress={() => onPress()} style={style.container}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </Pressable>
  );
};

export default BackButton;
