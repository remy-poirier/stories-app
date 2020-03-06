import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { RouteProp } from "@react-navigation/native"
import { Body, Spinner } from "native-base";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import Conversation from "src/conversation/Conversation";
import { StyleSheet } from "react-native";
import globalConnect from "src/redux/actions/utils";
import { Routes } from "src/redux/actions/GlobalActions";
import { RootState } from "src/redux/reducer/mainReducer";
import { getConversation } from "src/redux/selectors/conversationSelector";

type StoryScreenNavigationProps = StackNavigationProp<RootStackParamList, "Story">;
type StoryScreenRouteProps = RouteProp<RootStackParamList, "Story">;

interface Props {
  navigation: StoryScreenNavigationProps
  route: StoryScreenRouteProps;
  actions: Routes;
  conversation: ConversationInterface;
}

const StoryScreen = (props: Props) => {
  const { route, actions, conversation, navigation } = props;

  const [fetchConversation, setFetchConversation] = useState<boolean>(true);

  useEffect(() => {
    setFetchConversation(true);
    actions.conversation.reset();
    actions.conversation.get(route.params.storyId)
      .then(() => setFetchConversation(false))
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: conversation.name
    })
  }, [conversation]);

  const onGoBackToHome = () => {
    navigation.navigate("Home")
  };

  return (
    <Body style={styles.bg}>
      {fetchConversation && <Spinner />}
      {!fetchConversation && (
        <Conversation
          conversation={conversation}
          onGoBackToHome={onGoBackToHome}
        />
      )}
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

const stateToProps = (state: RootState) => ({
  conversation: getConversation(state),
});


export default globalConnect(stateToProps)(StoryScreen);
