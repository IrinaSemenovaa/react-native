import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  title: {
    position: "relative",
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 33,
    marginTop: -32,
    fontFamily: "RobotoMedium",
  },
  mainText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    fontFamily: "RobotoRegular",
  },
  input: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    color: "#BDBDBD",
  },
  inputFocused: {
    width: 343,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 108, 0, 1)",
    borderRadius: 8,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    color: "#212121",
  },
  lastInput: {
    marginBottom: 43,
  },
  button: {
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: 343,
    marginBottom: 16,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  text: {
    color: "#1B4371",
  },
});
