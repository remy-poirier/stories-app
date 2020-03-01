import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import { Message as MessageInterface, MessageSender } from "src/message/Constants";
import FadeInView from "src/common/fadeInView/FadeInView";
import { ScrollIntoView } from "react-native-scroll-into-view";

interface Props {
  message: MessageInterface;
  isFirstOfSender: boolean;
  isLastOfSender: boolean;
  name: string;
}

const Message = (props: Props) => {
  const { message, isFirstOfSender, isLastOfSender, name } = props;

  const msgNode = (
    <>
      <View key={message.id} style={{
        ...styles.msgContainer,
        ...(message.from === MessageSender.Witness) && {
          ...styles.witnessMsg
        },
        ...(message.from === MessageSender.Narrator) && {
          ...styles.narratorMsg
        },
        ...(isFirstOfSender) && {
          ...styles.isFirst
        },
      }}>
        <Text style={{
          ...styles.text,
          ...(message.from === MessageSender.Narrator) && {
            ...styles.narratorText
          },
        }} >{message.message}</Text>
      </View>
      {(isLastOfSender && message.from !== MessageSender.Narrator) && (
        <View style={styles.nameContainer}>
          <Text
            style={styles.name}
          >{name}</Text>
        </View>
      )}
    </>
  );

  const renderMessage = () => {
    if (message.from === MessageSender.Victim) {
      return (
        <FadeInView style={styles.msgFromVictim}>
          {msgNode}
        </FadeInView>
      )
    }

    if (message.from === MessageSender.Witness) {
      return (
        <FadeInView style={styles.msgFromWitness}>
          {msgNode}
        </FadeInView>
      )
    }

    if (message.from === MessageSender.Narrator) {
      return (
        <FadeInView style={styles.msgFromNarrator}>
          {msgNode}
        </FadeInView>
      )
    }

    return msgNode;
  };

  return renderMessage();

};

const styles = StyleSheet.create({
  msgContainer: {
    borderRadius: 24,
    backgroundColor: "#3d5afe",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    maxWidth: "70%",
  },

  witnessMsg: {
    backgroundColor: "#333",
    maxWidth: "70%",
  },

  narratorMsg: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    borderTopColor: "#9e9e9e",
    borderTopWidth: 1,
    borderBottomColor: "#9e9e9e",
    borderBottomWidth: 1,
    maxWidth: "100%",
  },

  text: {
    color: "white",
  },

  msgFromVictim: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
  },

  msgFromWitness: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
  },

  msgFromNarrator: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
  },

  isFirst: {
    marginTop: 16,
  },

  name: {
    color: "#9e9e9e",
    fontStyle: "italic",
    fontSize: 14,
  },

  nameContainer: {
    marginHorizontal: 16,
  },

  narratorText: {
    fontStyle: "italic",
    color: "#9e9e9e",
  }
});

export default Message;
