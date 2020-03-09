import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { RootState } from "src/redux/reducer/mainReducer";
import { getStories } from "src/redux/selectors/storiesSelector";
import globalConnect from "src/redux/actions/utils";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { Routes } from "src/redux/actions/GlobalActions";
import { Story } from "src/models/Story";
import { Body, Button, Card, CardItem, Icon, Spinner, Text, Toast, View } from "native-base";
import { appCommonStyles, appTheme } from "src/common/styles/styles";

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProps;
  actions: Routes;
  stories: Story[];
}

const StoriesList = (props: Props) => {
  const { navigation, actions, stories } = props;

  const [fetchStories, setFetchStories] = useState<boolean>(true);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
  }, [fetchStories, stories]);

  const onStoryClick = (storyId: string) => () => {
    if (!isScrolling) {
      navigation.push("Story", {
        storyId,
      })
    }
  };

  const onScroll = (isScrollingNow: boolean) => () => {
    setIsScrolling(isScrollingNow);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    actions.stories.fetch()
      .then(() => {
          setTimeout(() => {
          setRefreshing(false);
            Toast.show({
              type: "success",
              text: "Liste mise à jour avec succès"
            })
          }, 500)

      })
  }, [refreshing]);

  return (
    <ScrollView
      contentContainerStyle={styles.bgContentContainer}
      style={styles.bg}
      onScrollBeginDrag={onScroll(true)}
      onScrollEndDrag={onScroll(false)}
      refreshControl={(
        <RefreshControl tintColor={appTheme.primaryColor} refreshing={refreshing} onRefresh={onRefresh} />
      )}
    >
      {fetchStories && <Spinner color={appTheme.primaryColor} /> }
      {!fetchStories && stories.map((story) => (
        <Card onTouchEnd={onStoryClick(story.id)} style={styles.card} key={story.id}>
          <CardItem
            cardBody
            style={styles.storyCard}>
            <Image
              source={{ uri: story.imageUrl }}
              style={styles.storyCardImage}
            />
            <View
              style={styles.storyCardOverflow}
            >
              <Text
                style={styles.storyTitle}
                numberOfLines={1}
              >{story.name}</Text>
              <Text note>
                Par: {story.authorName}
              </Text>
              <Text note>
                Genre: {story.category}
              </Text>
              <Text numberOfLines={5} style={{...appCommonStyles.baseMTop, ...appCommonStyles.text}}>
                {story.description}
              </Text>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 16}}>
                <Icon name="thumbs-up" style={{color: appTheme.primaryColor, marginRight: 16,}} />
                <Text style={appCommonStyles.text}>
                  {story.nbLikes || 0}
                </Text>
              </View>
            </View>
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

  storyCard: {
    height: 400,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },

  storyTitle: {
    ...appCommonStyles.text,
    fontSize: 25,
    fontWeight: "bold",
    ...appCommonStyles.baseMBottom
  },

  storyCardOverflow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "flex-end",
    padding: 16,
  },

  storyCardActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },

  storyCardImage: {
    height: 400,
    width: "100%",
    flex: 1,
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
    marginHorizontal: 16,
    borderColor: appTheme.primaryColor,
    borderWidth: 1,
    marginBottom: 16,
  },

  cardItem: {
    backgroundColor: "#333",
    borderRadius: 0,
    display: "flex",
  },

  cardItemText: {
    color: "white",
  },

  cardDescription: {
    color: "#9e9e9e",
    fontStyle: "italic",
  },
});

const stateToProps = (state: RootState) => ({
  stories: getStories(state),
});

export default globalConnect(stateToProps)(StoriesList);
