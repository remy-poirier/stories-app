import React, { useEffect } from 'react';
import { RootState } from "../../../../redux/reducer/mainReducer";
import { getConversation } from "../../../../redux/selectors/conversationSelector";
import globalConnect from "../../../../redux/actions/utils";
import { AccountScreenNavigationProps, AccountStackParamList } from "../../../../common/typeRoutes/Constants";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import { RouteProp } from "@react-navigation/native"
import StoryComponent from "../../../../common/StoryComponent";

type StoryScreenRouteProps = RouteProp<AccountStackParamList, "Story">;

interface Props {
  navigation: AccountScreenNavigationProps;
  conversation: ConversationInterface;
  route: StoryScreenRouteProps;
}

const StoryScreen = (props: Props) => {
  const { conversation, navigation, route } = props;
  useEffect(() => {
    navigation.setOptions({
      title: conversation.name
    })
  }, [conversation]);
  
  const onBack = () => {
    navigation.navigate("ReadList");
  };
  
  return (
    <StoryComponent
      conversationId={route.params.storyId}
      onBack={onBack}
    />
  );
};

const stateToProps = (state: RootState) => ({
  conversation: getConversation(state),
});

export default globalConnect(stateToProps)(StoryScreen);