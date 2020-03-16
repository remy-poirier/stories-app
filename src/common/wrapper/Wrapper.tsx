import React, { useEffect, useState } from 'react';
import { Icon, Spinner, View, Text } from "native-base";
import HomeScreen from "src/screens/home/HomeScreen";
import AboutScreen from "src/screens/about/AboutScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import globalConnect from "src/redux/actions/utils";
import { Routes } from "src/redux/actions/GlobalActions";
import { auth } from "src/conf/firebase";
import AccountScreen from "src/screens/account/AccountScreen";
import { appTheme } from "src/common/styles/styles";

const Tab = createBottomTabNavigator();

interface Props {
  actions: Routes;
}

const Wrapper = (props: Props) => {
  const { actions } = props;
  const [fetchUser, setFetchUser] = useState<boolean>(true);

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      if (user) {
        actions.user.fetchUser(user.email)
          .then(() => setFetchUser(false))
          .catch(() => setFetchUser(false));
      } else {
        setFetchUser(false);
      }
    });
  }, []);

  const isTabBarVisible = (route: any): boolean => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home';
    return routeName !== "Story";
  };

  if (fetchUser) {
    return (
      <View style={styles.loadingView}>
        <Spinner color={appTheme.primaryColor}/>
        <Text style={styles.loadingText}>Chargement de l'application...</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home"
            } else if (route.name === "About") {
              iconName = focused ? "help-circle" : "help-circle-outline"
            } else if (route.name === "Account") {
              iconName = "person";
            }
            return (
              <Icon
                name={iconName}
                style={{
                  fontSize: size,
                  color: color,
                }}
              />
            );
          },
          tabBarVisible: isTabBarVisible(route),
        })}
        tabBarOptions={{
          activeTintColor: "#3d5afe",
          inactiveTintColor: "grey",
          style: styles.bottomNavigation,
          showLabel: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

  loadingView: {
    ...appTheme.screenView,
  },

  loadingText: {
    color: "white",
  },


  container: {
    flex: 1,
    // backgroundColor: '#000',
    justifyContent: "flex-start"
  },

  body: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    width: "100%"
  },

  header: {
    backgroundColor: '#000'
  },

  headerText: {
    color: "white",
  },

  bottomNavigation: {
    backgroundColor: "#121212",
  }
});

export default globalConnect()(Wrapper);
