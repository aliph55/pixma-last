import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import style from "./style";
import globalStyle from "../../assets/styles/globalStyle";

const Input = ({
  label,
  placeholder,
  secureTextEntry,
  keyboardType,
  onChangeText,
}) => {
  const [value, setValue] = useState("");
  return (
    <View>
      <Text style={style.label}>{label}</Text>
      <TextInput
        placeholder={placeholder ? placeholder : null}
        style={style.input}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={(val) => {
          setValue(val);
          onChangeText(val);
        }}
      />
    </View>
  );
};

export default Input;
