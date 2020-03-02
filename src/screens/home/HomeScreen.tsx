import React, { useEffect } from 'react';
import { Content, Text, Body, Button, CardItem, Card } from "native-base";
import { StyleSheet, Image, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { Routes } from "src/redux/actions/GlobalActions";
import globalConnect from "src/redux/actions/utils";
import { RootState } from "src/redux/reducer/mainReducer";
import { getStories } from "src/redux/selectors/storiesSelector";
import { Story } from "src/models/Story";

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProps;
  actions: Routes;
  stories: Story[];
}

const HomeScreen = (props: Props) => {
  const { navigation, actions, stories } = props;

  useEffect(() => {
    actions.stories.fetch()
      .then(() => {
        console.log("dazdzadaz");
      })
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.bgContentContainer}
      style={styles.bg}
    >
      {stories.map((story) => (
        <Card style={styles.card}>
          <CardItem header bordered style={styles.cardItem}>
            <Body>
              <Text style={styles.cardItemText}>{story.name}</Text>
              <Text note style={styles.cardItemText}>{story.category}</Text>
            </Body>
          </CardItem>
          <CardItem bordered cardBody style={styles.cardItem}>
            <Image
              source={{uri: story.imageUrl}}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={styles.cardDescription}>{story.description}</Text>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Body>
              <Button
                primary
                onPress={() => {
                  navigation.push("Story", {
                    storyId: story.id,
                  })
                }}
              >
                <Text>Lire l'histoire</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },

  bgContentContainer: {
    justifyContent: "flex-start",
    paddingBottom: 32,
  },

  bg: {
    flex: 1,
    width: "100%",
    display: "flex",
    backgroundColor: "#121212",
    paddingHorizontal: 8,
  },

  card: {
    width: "100%",
    marginHorizontal: 16,
    borderColor: "transparent",
    borderWidth: 3,
    marginBottom: 16,
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

const stateToProps = (state: RootState) => ({
  stories: getStories(state),
});

export default globalConnect(stateToProps)(HomeScreen);
