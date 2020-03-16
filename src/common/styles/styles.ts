import { StyleSheet } from "react-native";

const AppThemeColors = Object.freeze({
  primaryColor: "#3d5afe",
  backgroundColor: "#121212",
  errorColor: "red",
  text: "#FFFFFF",
  background: {
    default: "#121212",
    paper: "#333",
  }
});

export const appTheme = Object.freeze({

  background: {
    default: AppThemeColors.background.default,
    paper: AppThemeColors.background.paper,
  },

  primaryColor: AppThemeColors.primaryColor,
  errorColor: AppThemeColors.errorColor,
  text: AppThemeColors.text,

  screenView: {
    flex: 1,
    backgroundColor: AppThemeColors.background.default,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const appCommonStyles = StyleSheet.create({
  
  header: {
    backgroundColor: appTheme.background.default,
  },
  
  text: {
    color: "white",
  },

  screenView: {
    flex: 1,
    backgroundColor: AppThemeColors.background.default,
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
    backgroundColor: AppThemeColors.background.paper,
    padding: 16,
  },

  background: {
    backgroundColor: AppThemeColors.backgroundColor,
  },

});

