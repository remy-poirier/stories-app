import React, { useEffect, useState } from 'react';
import { View } from "native-base";
import { StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";
import Conversation from "../conversation/Conversation";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import globalConnect from "../redux/actions/utils";
import { RootState } from "../redux/reducer/mainReducer";
import { getConversation } from "../redux/selectors/conversationSelector";
import { Routes } from "../redux/actions/GlobalActions";

interface Props {
  onBack: () => void;
  conversationId: string;
  actions: Routes;
  conversation: ConversationInterface;
}

const StoryComponent = (props: Props) => {
  const { conversationId, onBack, actions, conversation } = props;

  const [fetchConversation, setFetchConversation] = useState<boolean>(true);

  useEffect(() => {
    setFetchConversation(true);
    actions.conversation.reset();
    actions.conversation.get(conversationId)
      .then(() => setFetchConversation(false))
  }, []);

  return (
    <View style={styles.bg}>
      {fetchConversation && <Spinner />}
      {!fetchConversation && (
        <Conversation
          conversation={conversation}
          onGoBackToHome={onBack}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },

  bg: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#121212",
    paddingVertical: 8,
  }
});

const stateToProps = (state: RootState) => ({
  conversation: getConversation(state),
});

export default globalConnect(stateToProps)(StoryComponent);