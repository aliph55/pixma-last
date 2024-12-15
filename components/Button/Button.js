import React from "react";
import { Pressable, Text } from "react-native";

import style from "./style";

const Button = ({ isDisabled, onPress, title }) => {
  return (
    <Pressable
      disabled={isDisabled}
      style={[style.button, isDisabled && style.disabled]}
      onPress={() => onPress()}
    >
      <Text style={style.title}>{title}</Text>
    </Pressable>
  );
};

//accidentally types default in the video, but should actually be defaultProps

export default Button;
