import React, { useEffect } from 'react';
import { View, Text, Button, Card } from "native-base";
import globalConnect from "src/redux/actions/utils";
import { RootState } from "src/redux/reducer/mainReducer";
import { getNbOfPublishedStories, getUser } from "src/redux/selectors/userSelector";
import { User } from "src/models/User";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccounStackParamList } from "src/common/typeRoutes/Constants";
import { Routes } from "src/redux/actions/GlobalActions";
import { appCommonStyles } from "src/common/styles/styles";
import { StyleSheet } from "react-native";

type LoggedScreenNavigationProps = StackNavigationProp<AccounStackParamList, "Profile">;


interface Props {
  user: User | null;
  navigation: LoggedScreenNavigationProps;
  actions: Routes;
  nbOfPublishedStories: number;
}

const LoggedScreen = (props: Props) => {
  const { user, actions, navigation, nbOfPublishedStories } = props;

  useEffect(() => {
    actions.user.getNbOfStoriesPublished();
  }, [])

  const onLogout = () => {
    actions.user.logout()
      .then(() => {
        navigation.replace("Authentication")
      })
  };

  return (
    <View style={appCommonStyles.screenView}>
      <Text style={appCommonStyles.text}>Nom d'utilisateur: {user ? user.displayName : ""}</Text>
      <Card style={appCommonStyles.card}>
        <Text style={styles.cardValue}>{nbOfPublishedStories}</Text>
        <Text style={styles.cardItemText}>Histoires publiées</Text>
      </Card>

      <Button style={appCommonStyles.baseMTop} onPress={() => onLogout()}>
        <Text style={appCommonStyles.text}>
          Déconnexion
        </Text>
      </Button>
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

});

const stateToProps = (state: RootState) => ({
  user: getUser(state),
  nbOfPublishedStories: getNbOfPublishedStories(state),
});

export default globalConnect(stateToProps)(LoggedScreen);
