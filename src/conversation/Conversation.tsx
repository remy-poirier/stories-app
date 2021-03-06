import React, { useState } from 'react';
import { Message as MessageInterface, MessageSender } from "src/message/Constants";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import Message from "src/message/Message";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Body, Button, Icon, Text, Toast, View } from "native-base";
import FadeInView from "src/common/fadeInView/FadeInView";
import { appCommonStyles } from "src/common/styles/styles";
import globalConnect from "src/redux/actions/utils";
import { RootState } from "../redux/reducer/mainReducer";
import { getConversation } from "../redux/selectors/conversationSelector";
import { getUser } from "../redux/selectors/userSelector";
import { Routes } from "../redux/actions/GlobalActions";

interface Props {
  conversation: ConversationInterface;
  onGoBackToHome: () => void;
  onLike: () => void;
  user: any;
  actions: Routes;
}

const Conversation = (props: Props) => {
  const { conversation, onGoBackToHome, user, actions } = props;

  const [displayedMessage, setDisplayedMessage] = useState<number>(0);
  const [isStoryEnded, setIsStoryEnded] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  let scrollViewRef = null;


  const setScrollViewRef = (element: any) => {
    scrollViewRef = element;
  };

  const onTap = () => {
    if (!isScrolling && !isStoryEnded) {
      setDisplayedMessage((previousDisplayedMessage) => {
        if (previousDisplayedMessage + 1 < conversation.messages.length) {
          return previousDisplayedMessage + 1
        }

        if (previousDisplayedMessage + 1 === conversation.messages.length) {
          setIsStoryEnded(true);
          actions.stories.defineAsRead(conversation.id);
          return previousDisplayedMessage
        }
      })
    }
  };

  const isFirst = (messageIndex: number, currentMessage: MessageInterface) => {
    if (messageIndex === 0) {
      return true;
    }

    return conversation.messages[messageIndex - 1].from !== currentMessage.from
  };

  const isLast = (messageIndex: number, currentMessage: MessageInterface): boolean => {
    if (messageIndex + 1 === conversation.messages.length) {
      return true;
    } else {
      return currentMessage.from !== conversation.messages[messageIndex + 1].from;
    }

  };

  const getDisplayName = (message: MessageInterface): string => {
    return message.from === MessageSender.Witness ? conversation.witnessName : conversation.victimName;
  };

  const onContentChange = (width: number, height: number) => {
    scrollViewRef.scrollToEnd({animated: true, duration: 500});
  };

  const onScroll = (isScrollingNow: boolean) => () => {
    setIsScrolling(isScrollingNow);
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
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.root}
      ref={(scrollRef) => setScrollViewRef(scrollRef)}
      onTouchEnd={onTap}
      onScrollBeginDrag={onScroll(true)}
      onScrollEndDrag={onScroll(false)}
      onContentSizeChange={onContentChange}
    >
        {conversation.messages.map((message, index) => {
          if (displayedMessage >= index) {
            return (
              <Message
                key={message.id}
                message={message}
                isFirstOfSender={isFirst(index, message)}
                isLastOfSender={isLast(index, message)}
                name={getDisplayName(message)}
              />
            )
          }
        })}

      {isStoryEnded && (
        <FadeInView style={styles.storyEndedContainer}>
          <Text style={styles.endStory}>FIN</Text>
          <Button primary onPress={onGoBackToHome}>
            <Text>
              Retour à l'accueil
            </Text>
          </Button>
          <Text style={{...appCommonStyles.text, ...appCommonStyles.baseMTop}}>Avez-vous apprécié cette histoire ?</Text>
          <View style={styles.likesContainer}>
            {user && (
              <Button
                bordered={!conversation.isLiked}
                style={styles.likeButton}
                onPress={onLike}
              >
                <Icon name="thumbs-up" />
              </Button>
            )}

            {!user && (
              <Text style={{...appCommonStyles.text, textAlign: "center"}}>
                Connectez-vous pour avoir la possibilité de liker les histoires
              </Text>
            )}
          </View>
        </FadeInView>
      )}
    </ScrollView>
  )
};

const styles = StyleSheet.create({

  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: Dimensions.get("window").width,
    paddingHorizontal: 8,
  },

  contentContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: 32,
  },

  scrollView: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  endContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  endStory: {
    fontSize: 60,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },

  storyEndedContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
  },

  likesContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  likeButton: {
    marginHorizontal: 8,
  }
});

const stateToProps = (state: RootState) => ({
  user:         getUser(state),
});

export default globalConnect(stateToProps)(Conversation);
