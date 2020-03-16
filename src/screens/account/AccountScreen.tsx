import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import globalConnect from "src/redux/actions/utils";
import { StyleSheet } from "react-native";
import { appTheme } from "src/common/styles/styles";
import { RootState } from "src/redux/reducer/mainReducer";
import { getUser } from "src/redux/selectors/userSelector";
import NotLoggedScreen from "src/screens/account/notLogged/NotLoggedScreen";
import ProfileScreen from "./logged/profile/ProfileScreen";
import ReadList from "./logged/readList/ReadList";
import StoryScreen from "./logged/story/StoryScreen";

interface Props {
  user: any;
}

const AccountStack = createStackNavigator();

const AccountScreen = (props: Props) => {
  const { user } = props;

  return (
    <AccountStack.Navigator
      initialRouteName={user ? "Profile" : "Authentication"}
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: "white",
      }}
    >
  
      <AccountStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profil"
        }}
      />
  
      <AccountStack.Screen
        name="ReadList"
        component={ReadList}
        options={{
          title: "Ma liste"
        }}
      />
  
      <AccountStack.Screen
        name="Story"
        component={StoryScreen}
        options={{
          title: "Chargement..."
        }}
      />

      <AccountStack.Screen
        name="Authentication"
        component={NotLoggedScreen}
        options={{
          title: "Authentification"
        }}
      />

    </AccountStack.Navigator>
  )
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: appTheme.background.default,
  },

  headerTitle: {
    color: "white",
  },
});

const stateToProps = (state: RootState) => ({
  user: getUser(state),
});

export default globalConnect(stateToProps)(AccountScreen);
