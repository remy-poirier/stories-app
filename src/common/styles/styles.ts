import { StyleSheet } from "react-native";

const AppThemeColors = Object.freeze({
  primaryColor: "#3d5afe",
  backgroundColor: "#121212",
  errorColor: "red",
});

export const appTheme = Object.freeze({
  primaryColor: AppThemeColors.primaryColor,
  backgroundColor: AppThemeColors.backgroundColor,
  errorColor: AppThemeColors.errorColor,

  screenView: {
    flex: 1,
    backgroundColor: AppThemeColors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const appCommonStyles = StyleSheet.create({
  text: {
    color: "white",
  },

  screenView: {
    flex: 1,
    backgroundColor: AppThemeColors.backgroundColor,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },

  textError: {
    color: "red",
  },

  baseMTop: {
    marginTop: 16,
  },

  baseMBottom: {
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 16,
  }

});

