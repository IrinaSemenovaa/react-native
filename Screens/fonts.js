import { useFonts } from "expo-font";

export const loadFonts = () => {
  return useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });
};