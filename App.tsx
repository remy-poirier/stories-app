import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "src/screens/home/HomeScreen";
import { RootState } from "src/redux/reducer/mainReducer";
import { Store } from "redux";
import { configureStore } from "src/redux/store/configureStore";
import { config } from "src/conf/config";
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutScreen from "src/screens/about/AboutScreen";
import { Icon, Text } from "native-base";


const store: Store<RootState, any> = configureStore({});

const Tab = createBottomTabNavigator();

const App = () => {
  const isTabBarVisible = (route: any): boolean => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home';
    return routeName !== "Story";
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home"
              } else if (route.name === "About") {
                iconName = focused ? "help-circle" : "help-circle-outline"
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
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

const styles = StyleSheet.create({
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

export default App;
