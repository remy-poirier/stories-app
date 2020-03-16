import React, { useState } from 'react';
import { Story } from "../../models/Story";
import { Dimensions, Image, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { appCommonStyles, appTheme } from "../styles/styles";
import { Card, CardItem, Icon, Text, Toast, View } from "native-base";
import { Spinner } from "@ui-kitten/components";
import globalConnect from "../../redux/actions/utils";
import { Routes } from "../../redux/actions/GlobalActions";
import { RootState } from "../../redux/reducer/mainReducer";
import { getUser } from "../../redux/selectors/userSelector";
import { User } from "../../models/User";

interface Props {
  stories: Story[];
  onRefresh: () => void;
  isRefreshing: boolean;
  isFetching: boolean;
  onStoryClick: (id: string) => void;
  actions: Routes;
  user: User | null;
}

/**
 * @Desc simple display component rendering a list
 * @constructor
 */
const StoriesList = (props: Props) => {
  const {
    stories, isRefreshing, onRefresh, isFetching, onStoryClick, actions, user,
  } = props;
  
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isAddingToLaterList, setIsAddingToLaterList] = useState<string | undefined>(undefined);

  const onScroll = (isScrollingNow: boolean) => () => setIsScrolling(isScrollingNow);

  const onClick = (storyId: string) => () => {
    if (!isScrolling) {
      onStoryClick(storyId);
    }
  };
  
  const onReadLaterClick = (story: Story) => () => {
    
    if (!user) {
      Toast.show({
        text: "Vous devez être connecté pour utiliser cette fonctionnalité.",
        type: "danger",
      })
    } else {
      setIsAddingToLaterList(story.id);
      
      if (story.readList.includes(user.id)) {
        actions.stories.removeFromList(story)
          .then(() => {
            setIsAddingToLaterList(undefined);
            Toast.show({
              text: "Histoire retirée de votre liste avec succès.",
              type: "success"
            })
          })
      } else {
        actions.stories.addToList(story)
          .then(() => {
            setIsAddingToLaterList(undefined);
            Toast.show({
              text: "Histoire ajoutée à votre liste. Vous pouvez retrouver les histoires de votre liste via la page mon compte.",
              type: "success",
              duration: 5000,
            })
          });
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.bgContentContainer}
      style={{
        ...styles.bg,
        ...isFetching ? styles.loadingContainer : null,
      }}
      onScrollBeginDrag={onScroll(true)}
      onScrollEndDrag={onScroll(false)}
      refreshControl={(
        <RefreshControl tintColor={appTheme.primaryColor} refreshing={isRefreshing} onRefresh={onRefresh} />
      )}
    >
      {isFetching &&
        <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 16,
              flex: 1,
              alignContent: "center",
              display: "flex",
              width: Dimensions.get("window").width
            }}
        >
          <Spinner style={{justifyContent: "center", alignItems: "center"}} />
        </View>
       }
      {!isFetching && stories.map((story) => (
        <Card style={styles.card} key={story.id}>
          <CardItem
            cardBody
            style={styles.storyCard}
            onPress={onClick(story.id)}
          >
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
                <Icon name="heart" type="FontAwesome5" style={{color: "grey", marginRight: 8, fontSize: 16}} />
                <Text style={appCommonStyles.text}>
                  {story.nbLikes || 0}
                </Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 8}}>
                <Icon name="eye" type="FontAwesome5" style={{color: "grey", marginRight: 8, fontSize: 16}} />
                <Text style={appCommonStyles.text}>
                  {story.nbReads || 0}
                </Text>
              </View>
            </View>
          </CardItem>
          <CardItem style={styles.cardActions}>
            <View
              style={{
                ...styles.cardActionsItem,
                marginLeft: 0,
              }}
              onTouchEnd={onReadLaterClick(story)}
            >
              {isAddingToLaterList === story.id ? (
                <Spinner style={styles.spinner} />
              ) : (
                <Icon
                  name={(user && story.readList.includes(user.id)) ? "check" : "clock"}
                  type="FontAwesome5"
                  style={{
                    ...styles.cardActionsItemIcon,
                    ...(user && story.readList.includes(user.id)) ? styles.successIcon : null,
                  }}
                />
              )}
              
              <Text style={styles.cardActionsItemText}>
                Ma liste
              </Text>
            </View>
  
            <View
              style={{
                ...styles.cardActionsItem,
                marginRight: 0,
              }}
              onTouchEnd={onClick(story.id)}
            >
              <Icon
                name="eye"
                type="FontAwesome5"
                style={{
                  ...styles.cardActionsItemIcon,
                }}
              />
    
              <Text style={styles.cardActionsItemText}>
                Lire
              </Text>
            </View>
          </CardItem>
        </Card>
      ))}

      {!isFetching && stories.length === 0 && (
        <View style={{justifyContent: "center", alignItems: "center", marginTop: 16}}>
          <Icon name="inbox" type="FontAwesome5" style={{color: "white", fontSize: 30}} />
          <Text
            style={{
              ...appCommonStyles.baseMTop,
              ...appCommonStyles.text,
              textAlign: "center",
            }}>
            Oops, aucune histoire à afficher
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

  const styles = StyleSheet.create({
  bgContentContainer: {
    justifyContent: "flex-start",
    paddingBottom: 32,
  },

  bg: {
    flex: 1,
    width: "100%",
    display: "flex",
    backgroundColor: appTheme.background.default,
    paddingHorizontal: 8,
  },

  card: {
    marginHorizontal: 16,
    borderColor: appTheme.background.default,
    borderWidth: 1,
    marginBottom: 16,
  },

  storyCard: {
    height: 400,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },

  storyCardImage: {
    height: 400,
    width: "100%",
    flex: 1,
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

  storyTitle: {
    ...appCommonStyles.text,
    ...appCommonStyles.baseMBottom,
    fontSize: 25,
    fontWeight: "bold",
  },

  cardActions: {
    backgroundColor: appTheme.background.paper,
    borderRadius: 0,
    alignItems: "center",
  },

  cardActionsItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 16,
  },

  cardActionsItemIcon: {
    color: "grey",
    fontSize: 22,
    textAlign: "center",
    marginHorizontal: 8,
    height: 24,
  },

  cardActionsItemText: {
    color: "grey",
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
    textTransform: "uppercase",
  },
  
  spinner: {
    width: 24,
    height: 24,
    textAlign: "center"
  },
  
  successIcon: {
    color: "green",
  },
  
  loadingContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: 500,
  },

});

const stateToProps = (state: RootState) => ({
  user: getUser(state),
});

export default globalConnect(stateToProps)(StoriesList);