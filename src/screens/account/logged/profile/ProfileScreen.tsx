import React, { useEffect, useState } from 'react';
import { RootState } from "../../../../redux/reducer/mainReducer";
import { getNbOfPublishedStories, getUser, getUserReadList } from "../../../../redux/selectors/userSelector";
import globalConnect from "../../../../redux/actions/utils";
import { StyleSheet } from "react-native";
import { appCommonStyles } from "../../../../common/styles/styles";
import { Button, Card, Text, View } from "native-base";
import { User } from "../../../../models/User";
import { Routes } from "../../../../redux/actions/GlobalActions";
import { Story } from "../../../../models/Story";
import {
  AccountScreenNavigationProps,
} from "../../../../common/typeRoutes/Constants";

interface Props {
  user: User | null;
  navigation: AccountScreenNavigationProps;
  actions: Routes;
  nbOfPublishedStories: number;
  readList: Story[];
}

const ProfileScreen = (props: Props) => {
  const {
    user, actions, navigation, nbOfPublishedStories, readList,
  } = props;
  
  const [fetchData, setFetchData] = useState<boolean>(true);
  
  useEffect(() => {
    setFetchData(true);
    
    Promise.all([
      actions.user.getNbOfStoriesPublished(),
      actions.user.getStoriesToReadLater()
    ])
      .then(() => {
        setFetchData(false)
      })
      .catch(() => {
        setFetchData(false)
      })
  }, []);
  
  const onLogout = () => {
    actions.user.logout()
      .then(() => {
        navigation.replace("Authentication");
      })
  };
  
  const onReadListClick = () => {
    navigation.navigate("ReadList")
  };
  
  return (
    <View
      style={{
        ...appCommonStyles.screenView,
        ...fetchData ? styles.loadingContainer : null,
      }}
    >
    
      {!fetchData &&
      <>
        <Text style={appCommonStyles.text}>Nom d'utilisateur: {user ? user.displayName : ""}</Text>
        <Card style={{...appCommonStyles.card, backgroundColor: "transparent", borderWidth: 0, borderColor: "transparent"}}>
          <Text style={styles.cardValue}>{nbOfPublishedStories}</Text>
          <Text style={styles.cardItemText}>Histoires publiées</Text>
        </Card>

        <Card style={appCommonStyles.card} onTouchEnd={onReadListClick}>
          <Text style={styles.cardValue}>{readList.length}</Text>
          <Text style={styles.cardItemText}>Dans ma liste</Text>
        </Card>

        <Button style={appCommonStyles.baseMTop} onPress={() => onLogout()}>
          <Text style={appCommonStyles.text}>
            Déconnexion
          </Text>
        </Button>
      </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  cardValue: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  
  cardItemText: {
    textAlign: "center",
    color: "white",
  },
  
  loadingContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
    display: "flex",
    flexDirection: "row",
  }
  
});

const stateToProps = (state: RootState) => ({
  user: getUser(state),
  nbOfPublishedStories: getNbOfPublishedStories(state),
  readList: getUserReadList(state),
});

export default globalConnect(stateToProps)(ProfileScreen);