import React from 'react';
import { View, Text } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralInfo from "src/screens/about/generalInfo/GeneralInfo";
import { StyleSheet } from "react-native";
import { appTheme } from "src/common/styles/styles";

const AboutStack = createStackNavigator();

const AboutScreen = () => {
  return (
    <AboutStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: "white",
      }}
    >
      <AboutStack.Screen
        name="General"
        component={GeneralInfo}
        options={{
          title: "A propos"
        }}
      />
    </AboutStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: appTheme.background.default,
  },

  headerTitle: {
    color: "white",
  },
});

export default AboutScreen;
