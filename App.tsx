import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Body, Container, Content, Header } from "native-base";
import { Message as MessageInterface, MessageSender } from "./src/message/Constants";
import Conversation from "src/conversation/Conversation";
import { Conversation as ConversationInterface } from "src/conversation/Constants"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import StoryScreen from "src/screens/story/StoryScreen";
import HomeScreen from "src/screens/home/HomeScreen";


const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  return (
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
  )

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Body>
          <Text style={styles.headerText}>
            Discussion
          </Text>
        </Body>
      </Header>
      <Body style={styles.body}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
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
      </Body>
    </Container>
  );
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
