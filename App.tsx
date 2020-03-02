import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import StoryScreen from "src/screens/story/StoryScreen";
import HomeScreen from "src/screens/home/HomeScreen";
import { RootState } from "src/redux/reducer/mainReducer";
import { Store } from "redux";
import { configureStore } from "src/redux/store/configureStore";
import { config } from "src/conf/config";
import { Provider } from 'react-redux';

const Stack = createStackNavigator<RootStackParamList>();

const store: Store<RootState, any> = configureStore({});

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Accueil"
            }}
          />
          <Stack.Screen
            name="Story"
            component={StoryScreen}
            options={{
              title: "Un sentiment étrange"
            }}
          />
        </Stack.Navigator>
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
});

export default App;
