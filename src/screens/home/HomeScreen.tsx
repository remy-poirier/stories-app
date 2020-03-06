import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import StoryScreen from "src/screens/story/StoryScreen";
import StoriesList from "src/screens/home/storiesList/StoriesList";
import { StyleSheet } from "react-native";
import { appTheme } from "src/common/styles/styles";

const HomeStack = createStackNavigator<RootStackParamList>();

const HomeScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: "white",
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={StoriesList}
        options={{
          title: "Accueil"
        }}
      />
      <HomeStack.Screen
        name="Story"
        component={StoryScreen}
        options={{
          title: "Un sentiment étrange"
        }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: appTheme.backgroundColor,
  },

  headerTitle: {
    color: "white",
  },
});

export default HomeScreen;
