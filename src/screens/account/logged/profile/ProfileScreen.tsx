import React, { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { Button, Card, Icon, Text, View } from "native-base";
import { AccountScreenNavigationProps } from "src/common/typeRoutes/Constants";
import { Story } from "src/models/Story";
import { Routes } from "src/redux/actions/GlobalActions";
import { User } from "src/models/User";
import { appCommonStyles } from "src/common/styles/styles";
import { getNbOfPublishedStories, getUser, getUserReadList } from "src/redux/selectors/userSelector";
import { RootState } from "src/redux/reducer/mainReducer";
import globalConnect from "src/redux/actions/utils";
import { Notifications } from "expo";
import { areNotificationsEnabled, getNotificiationStatus } from "src/conf/config";
import Divider from "src/shared/divider/Divider";

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
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false)

  useEffect(() => {
    setFetchData(true);

    areNotificationsEnabled()
      .then((status) => {
        setNotificationsEnabled(status);
      });


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
          <Text style={styles.sectionTitle}>Informations</Text>
          <Text style={appCommonStyles.text}>Nom d'utilisateur: {user ? user.displayName : ""}</Text>
          <Text style={{...appCommonStyles.text, marginVertical: 8, fontWeight: "bold"}}>Notifications: </Text>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 8,}}>
            {notificationsEnabled ? (
              <>
                <Icon style={{...styles.notificationIcon, color: "lightgreen", fontSize: 20}} type="FontAwesome5" name="check" />
                <Text style={appCommonStyles.text}>
                  Activées
                </Text>
              </>
            ) : (
              <>
                <Icon style={{...styles.notificationIcon, color: "red"}} type="FontAwesome5" name="times" />
                <Text style={appCommonStyles.text}>
                  Désactivées
                </Text>
              </>
            )}
          </View>

          <Text style={{...appCommonStyles.text, fontSize: 12, marginBottom: 8}}>
            L'activation des notifications vous permet d'être informé à chaque fois qu'une nouvelle histoire est
            publiée.
          </Text>

          <Divider/>

          <Text style={{...styles.sectionTitle, marginTop: 16}}>Statistiques</Text>

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
  },

  notificationIcon: {
    marginRight: 8,
  },

  sectionTitle: {
    ...appCommonStyles.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16
  }

});

const stateToProps = (state: RootState) => ({
  user: getUser(state),
  nbOfPublishedStories: getNbOfPublishedStories(state),
  readList: getUserReadList(state),
});

export default globalConnect(stateToProps)(ProfileScreen);