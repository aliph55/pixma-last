import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from "../../assets/styles/scaling";

const style = StyleSheet.create({
  header: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(24),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIntroText: {
    fontFamily: "Inter",
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    fontWeight: "400",
    color: "#636776",
  },
  username: {
    marginTop: verticalScale(5),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  searchBox: {
    marginHorizontal: horizontalScale(24),
    marginTop: verticalScale(20),
  },
  highlightedImageContainer: {
    marginHorizontal: horizontalScale(24),
  },
  highlightedImage: {
    width: "100%",
    height: verticalScale(160),
  },
  categoryHeader: {
    marginHorizontal: horizontalScale(24),
    marginBottom: verticalScale(16),
    marginTop: verticalScale(6),
  },
  categories: {
    marginLeft: horizontalScale(24),
  },
  categoryItem: {
    marginRight: horizontalScale(10),
  },
  donationItemsContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(24),
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  singleDonationItem: {
    maxWidth: "49%",
    marginBottom: verticalScale(23),
  },
});

export default style;
