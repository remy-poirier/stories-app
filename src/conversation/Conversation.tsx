import React, { useState } from 'react';
import { Message as MessageInterface, MessageSender } from "src/message/Constants";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import Message from "src/message/Message";
import { ScrollView, StyleSheet } from "react-native";
import { Body, Button, Text } from "native-base";
import FadeInView from "src/common/fadeInView/FadeInView";

interface Props {
  conversation: ConversationInterface;
  onGoBackToHome: () => void;
}

const Conversation = (props: Props) => {
  const { conversation, onGoBackToHome } = props;

  const [displayedMessage, setDisplayedMessage] = useState<number>(0);
  const [isStoryEnded, setIsStoryEnded] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  let scrollViewRef = null;


  const setScrollViewRef = (element: any) => {
    scrollViewRef = element;
  };

  const onTap = () => {
    if (!isScrolling) {
      setDisplayedMessage((previousDisplayedMessage) => {
        if (previousDisplayedMessage + 1 < conversation.messages.length) {
          return previousDisplayedMessage + 1
        }

        if (previousDisplayedMessage + 1 === conversation.messages.length) {
          setIsStoryEnded(true)
        }

        return 0;
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

  if (isStoryEnded) {
    return (
      <Body style={styles.endContainer}>
        <FadeInView>
          <Text style={styles.endStory}>FIN</Text>

          <Button primary onPress={onGoBackToHome}>
            <Text>
              Retour à l'accueil
            </Text>
          </Button>
        </FadeInView>
      </Body>
    )
  }

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
    </ScrollView>
  )
};

const styles = StyleSheet.create({

  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
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
  }
});

export default Conversation;
