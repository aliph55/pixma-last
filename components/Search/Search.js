import React, { useRef, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { scaleFontSize } from "../../assets/styles/scaling";

import style from "./style";

const Search = ({ onSearch, placeholder }) => {
  const textInputRef = useRef(null);
  const [search, setSearch] = useState("");

  const handleFocus = () => {
    textInputRef.current.focus();
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    onSearch(searchValue);
  };
  return (
    <Pressable style={style.searchInputContainer} onPress={handleFocus}>
      <AntDesign name="search1" color={"#25C0FF"} size={scaleFontSize(22)} />
      <TextInput
        placeholder={placeholder}
        ref={textInputRef}
        style={style.searchInput}
        value={search}
        onChangeText={(value) => handleSearch(value)}
      />
    </Pressable>
  );
};

export default Search;
