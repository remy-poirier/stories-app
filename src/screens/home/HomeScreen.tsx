import React from 'react';
import { Content, Text, Body, Button, CardItem, Card } from "native-base";
import { StyleSheet, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProps;
}

const HomeScreen = (props: Props) => {
  const { navigation } = props;
  return (
    <Body style={styles.bg}>
      <Card style={styles.card}>
        <CardItem header bordered style={styles.cardItem}>
          <Body>
            <Text style={styles.cardItemText}>Un sentiment étrange</Text>
            <Text note style={styles.cardItemText}>Horreur</Text>
          </Body>
        </CardItem>
        <CardItem bordered cardBody style={styles.cardItem}>
          <Image
            source={{uri: 'https://www.businessinsider.fr/content/uploads/2019/10/5db32ec3045a31111c3df084.jpeg'}}
            style={{height: 200, width: null, flex: 1}}
          />
        </CardItem>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda commodi dolore doloremque dolorum eaque enim officia, possimus similique voluptate! Dignissimos dolore est facere iure minus qui quis, rerum similique.</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <Body>
            <Button
              primary
              onPress={() => {
                navigation.push("Story", {
                  storyId: 1,
                })
              }}
            >
              <Text>Lire l'histoire</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
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
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#121212",
    paddingHorizontal: 8,
  },

  card: {
    width: "100%",
    marginHorizontal: 16,
    borderColor: "transparent",
    borderWidth: 3,
  },

  cardItem: {
    backgroundColor: "#333",
    borderRadius: 0,
  },

  cardItemText: {
    color: "white",
  },

  cardDescription: {
    color: "#9e9e9e",
    fontStyle: "italic",
  }
});

export default HomeScreen;
