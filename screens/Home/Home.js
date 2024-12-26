import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import Tab from "../../components/Tab/Tab";
import SingleDonationItem from "../../components/SingleDonationItem/SingleDonationItem";

import globalStyle from "../../assets/styles/globalStyle";
import style from "./style";
import { updateSelectedDonationId } from "../../redux/Donations";
import { updateSelectedCategoryId } from "../../redux/Categories";
import { resetToInitialState } from "../../redux/User";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const userProfile =
  "https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top";

const Home = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  const user = useSelector((state) => state.user?.userInfo);
  const userInfo = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const donations = useSelector((state) => state.donations);

  const [donationItems, setDonationItems] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const categoryPageSize = 4;

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // setInfo(undefined);
      // setState({ user: null }); // Remember to remove the user from your app's state as well
      navigation.push("Auth");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const items = donations.items.filter((value) =>
      value.categoryIds.includes(categories.selectedCategoryId)
    );
    setDonationItems(items);
  }, [categories.selectedCategoryId]);

  useEffect(() => {
    setIsLoadingCategories(true);
    setCategoryList(
      pagination(categories.categories, categoryPage, categoryPageSize)
    );
    setCategoryPage((prev) => prev + 1);
    setIsLoadingCategories(false);
  }, []);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  };

  const Logout = async () => {
    dispatch(resetToInitialState());
    // navigation.push("Auth");
    await signOut();
  };

  return (
    <SafeAreaView
      style={[globalStyle.backgroundWhite, globalStyle.flex, { width, height }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.header}>
          <View>
            <Text style={style.headerIntroText}>Hello, </Text>
            <View style={style.username}>
              <Header title={userInfo ? user?.name + " 👋" : "Hi there"} />
            </View>
          </View>
          <View>
            <Image
              source={{
                uri: userInfo ? user?.photo : userProfile,
              }}
              style={style.profileImage}
              resizeMode={"contain"}
            />
            <Pressable
              onPress={async () => {
                Logout();
              }}
            >
              <Header
                type={3}
                title={userInfo ? "Logout" : "Login"}
                color={"#156CF7"}
              />
            </Pressable>
          </View>
        </View>
        <View style={style.searchBox}>
          <Search />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require("../../assets/images/highlighted_image.png")}
            resizeMode={"contain"}
          />
        </Pressable>
        <View style={style.categoryHeader}>
          <Header title={"Select Category"} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) {
                return;
              }
              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize
              );
              if (newData.length > 0) {
                setCategoryList((prevState) => [...prevState, ...newData]);
                setCategoryPage((prevState) => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({ item }) => (
              <View style={style.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId}
                  onPress={(value) => dispatch(updateSelectedCategoryId(value))}
                  title={item.name}
                  isInactive={item.categoryId !== categories.selectedCategoryId}
                />
              </View>
            )}
          />
        </View>
        {donationItems.length > 0 && (
          <View style={style.donationItemsContainer}>
            {donationItems.map((value) => {
              const categoryInformation = categories.categories.find(
                (val) => val.categoryId === categories.selectedCategoryId
              );
              return (
                <View
                  key={value.donationItemId}
                  style={style.singleDonationItem}
                >
                  <SingleDonationItem
                    onPress={(selectedDonationId) => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate("SingleDonationItem", {
                        categoryInformation,
                      });
                    }}
                    donationItemId={value.donationItemId}
                    uri={value.image}
                    donationTitle={value.name}
                    badgeTitle={categoryInformation.name}
                    price={parseFloat(value.price)}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Exporting the Home component to be used in other parts of the app
export default Home;
