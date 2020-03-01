import React from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { RouteProp } from "@react-navigation/native"
import { View, Text, Body } from "native-base";
import { Message as MessageInterface, MessageSender } from "src/message/Constants";
import { Conversation as ConversationInterface } from "src/conversation/Constants";
import Conversation from "src/conversation/Conversation";
import { StyleSheet } from "react-native";

type StoryScreenNavigationProps = StackNavigationProp<RootStackParamList, "Story">;
type StoryScreenRouteProps = RouteProp<RootStackParamList, "Story">;

interface Props {
  navigation: StoryScreenNavigationProps
  route: StoryScreenRouteProps;
}

const messages: MessageInterface[] = [
  {
    id: 0,
    message: "J'ai peur...",
    from: MessageSender.Victim,
  },
  {
    id: 1,
    message: "Que se passe-t-il ?",
    from: MessageSender.Witness,
  },
  {
    id: 2,
    message: "Réponds-moi, je m'inquiète...",
    from: MessageSender.Witness,
  },
  {
    id: 3,
    message: "Je crois qu'il y a quelqu'un dans la maison",
    from: MessageSender.Victim,
  },
  {
    id: 4,
    message: "Soudain, un bruit résonne au rez-de-chaussée",
    from: MessageSender.Narrator,
  },
  {
    id: 5,
    message: "J'entends une chaise bouger dans le salon...",
    from: MessageSender.Victim,
  },
  {
    id: 6,
    message: "Enferme-toi dans la chambre, je suis en chemin pour rentrer à la maison et j'appelle la police en même temps",
    from: MessageSender.Witness,
  },
  {
    id: 7,
    message: "Je ne peux pas fermer la porte à clef, j'ai trop peur qu'il entende le bruit de la serrure...",
    from: MessageSender.Victim,
  },
  {
    id: 8,
    message: "Tu as raison, essaye de te cacher sous le lit ou dans l'armoire en attendant que la police arrive. Je fais au plus vite je serais là dans 5 minutes maximum...",
    from: MessageSender.Witness,
  },
  {
    id: 9,
    message: "As-tu réussi à te cacher ?",
    from: MessageSender.Witness,
  },
  {
    id: 10,
    message: "Bébé?",
    from: MessageSender.Witness,
  },
];


const conversationMock: ConversationInterface = {
  victimName: "Mathilde",
  witnessName: "Rémy",
  messages: messages
};

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
