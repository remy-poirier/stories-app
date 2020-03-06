import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from "react-native";
import { RootState } from "src/redux/reducer/mainReducer";
import { getStories } from "src/redux/selectors/storiesSelector";
import globalConnect from "src/redux/actions/utils";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { Routes } from "src/redux/actions/GlobalActions";
import { Story } from "src/models/Story";
import { Body, Button, Card, CardItem, Spinner, Text } from "native-base";
import { appTheme } from "src/common/styles/styles";

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProps;
  actions: Routes;
  stories: Story[];
}

const StoriesList = (props: Props) => {
  const { navigation, actions, stories } = props;

  const [fetchStories, setFetchStories] = useState<boolean>(true);

  useEffect(() => {
    actions.stories.fetch()
      .then(() => {
        setFetchStories(false)
      })
  }, []);

  useEffect(() => {
    if (!fetchStories && stories.length === 0) {
      setFetchStories(true)
      actions.stories.fetch()
        .then(() => {
          setFetchStories(false)
        })
    }
  }, [fetchStories, stories])

  return (
    <ScrollView
      contentContainerStyle={styles.bgContentContainer}
      style={styles.bg}
    >
      {fetchStories && <Spinner /> }
      {!fetchStories && stories.map((story) => (
        <Card style={styles.card} key={story.id}>
          <CardItem header bordered style={styles.cardItem}>
            <Body>
              <Text style={styles.cardItemTitle}>{story.name}</Text>
              <Text note style={styles.cardItemText}>{story.category}</Text>
              <Text note style={styles.cardItemText}>Ecrit par: {story.authorName}</Text>
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
                style={styles.btn}
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

  cardItemTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  text: {
    color: "white",
  },

  btn: {
    backgroundColor: appTheme.primaryColor,
  },

  bgContentContainer: {
    justifyContent: "flex-start",
    paddingBottom: 32,
  },

  bg: {
    flex: 1,
    width: "100%",
    display: "flex",
    backgroundColor: appTheme.backgroundColor,
    paddingHorizontal: 8,
  },

  card: {
    width: "100%",
    marginHorizontal: 16,
    borderColor: "transparent",
    borderWidth: 0,
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

export default globalConnect(stateToProps)(StoriesList);
