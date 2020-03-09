import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { RouteProp } from "@react-navigation/native"
import { Body, Spinner, Toast } from "native-base";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import Conversation from "src/conversation/Conversation";
import { StyleSheet } from "react-native";
import globalConnect from "src/redux/actions/utils";
import { Routes } from "src/redux/actions/GlobalActions";
import { RootState } from "src/redux/reducer/mainReducer";
import { getConversation } from "src/redux/selectors/conversationSelector";
import { appTheme } from "src/common/styles/styles";
import { getUser } from "src/redux/selectors/userSelector";

type StoryScreenNavigationProps = StackNavigationProp<RootStackParamList, "Story">;
type StoryScreenRouteProps = RouteProp<RootStackParamList, "Story">;

interface Props {
  navigation: StoryScreenNavigationProps
  route: StoryScreenRouteProps;
  actions: Routes;
  conversation: ConversationInterface;
  user: any;
}

const StoryScreen = (props: Props) => {
  const { route, actions, conversation, navigation, user, } = props;

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

  const onLike = () => {
    if (conversation.isLiked) {
      actions.conversation.dislike(conversation.id)
        .then(() => {
          Toast.show({
            type: "success",
            text: "Votre like a bien été retiré !"
          })
        })
    } else {
      actions.conversation.like(conversation.id)
        .then(() => {
          Toast.show({
            type: "success",
            text: "Votre like a bien été pris en compte !"
          })
        })
    }

  };

  return (
    <Body style={styles.bg}>
      {fetchConversation && <Spinner color={appTheme.primaryColor} />}
      {!fetchConversation && (
        <Conversation
          conversation={conversation}
          onGoBackToHome={onGoBackToHome}
          onLike={onLike}
          user={user}
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
  user:         getUser(state),
});


export default globalConnect(stateToProps)(StoryScreen);
