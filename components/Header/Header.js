import React from "react";
import { View, Text } from "react-native";
import style from "./style";
const Header = ({ type, numberOfLines, title, color }) => {
  const styleToApply = () => {
    switch (type) {
      case 1:
        return style.title1;
      case 2:
        return style.title2;
      case 3:
        return style.title3;
    }
  };
  return (
    <View>
      <Text
        style={[styleToApply(), color && { color: color }]}
        numberOfLines={numberOfLines ? numberOfLines : null}
      >
        {title}
      </Text>
    </View>
  );
};

//accidentally types default in the video, but should actually be defaultProps

export default Header;
