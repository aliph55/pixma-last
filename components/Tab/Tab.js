import React, { useRef, useState } from "react";
import { Pressable, Text } from "react-native";

import style from "./style";
import { horizontalScale } from "../../assets/styles/scaling";

const Tab = ({ isInactive, onPress, tabId, title }) => {
  const [width, setWidth] = useState(0);
  const textRef = useRef(null);
  const paddingHorizontal = 33;
  const tabWidth = {
    width: horizontalScale(paddingHorizontal * 2 + width),
  };
  return (
    <Pressable
      style={[style.tab, isInactive && style.inactiveTab, tabWidth]}
      onPress={() => onPress(tabId)}
    >
      <Text
        onTextLayout={(event) => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        ref={textRef}
        style={[style.title, isInactive && style.inactiveTitle]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

//accidentally types default in the video, but should actually be defaultProps

export default Tab;
