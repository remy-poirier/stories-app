import React, { useEffect } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { RouteProp } from "@react-navigation/native"
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import globalConnect from "src/redux/actions/utils";
import { Routes } from "src/redux/actions/GlobalActions";
import { RootState } from "src/redux/reducer/mainReducer";
import { getConversation } from "src/redux/selectors/conversationSelector";
import StoryComponent from "../../common/StoryComponent";

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
  const { route, conversation, navigation } = props;
  
  useEffect(() => {
    navigation.setOptions({
      title: conversation.name
    })
  }, [conversation]);

  const onGoBackToHome = () => {
    navigation.navigate("Home")
  };
  
  return (
    <StoryComponent
      conversationId={route.params.storyId}
      onBack={onGoBackToHome}
    />
  );
};

const stateToProps = (state: RootState) => ({
  conversation: getConversation(state),
});

export default globalConnect(stateToProps)(StoryScreen);
