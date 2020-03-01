import React from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { RouteProp } from "@react-navigation/native"
import { View, Text, Body } from "native-base";
import { Message as MessageInterface, MessageSender } from "src/message/Constants";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import Conversation from "src/conversation/Conversation";
import { StyleSheet } from "react-native";
import { conversationMock } from "src/screens/story/fakeConversation";

type StoryScreenNavigationProps = StackNavigationProp<RootStackParamList, "Story">;
type StoryScreenRouteProps = RouteProp<RootStackParamList, "Story">;

interface Props {
  navigation: StoryScreenNavigationProps
  route: StoryScreenRouteProps;
}

const StoryScreen = (props: Props) => {
  const { route } = props;
  return (
    <Body style={styles.bg}>
      <Conversation conversation={conversationMock} />
    </Body>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },

  bg: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: "#121212",
    paddingVertical: 8,
  }
});


export default StoryScreen;
