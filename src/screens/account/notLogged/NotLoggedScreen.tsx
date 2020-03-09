import React from 'react';
import { View, Tabs, Tab } from "native-base";
import { StyleSheet } from "react-native";
import { appCommonStyles, appTheme } from "src/common/styles/styles";
import LoginTab from "src/screens/account/notLogged/LoginTab";
import SigninTab from "src/screens/account/notLogged/SigninTab";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccounStackParamList } from "src/common/typeRoutes/Constants";
import globalConnect from "src/redux/actions/utils";
import { Routes } from "src/redux/actions/GlobalActions";
import { auth } from "src/conf/firebase";

type NotLoggedScreenNavigationProps = StackNavigationProp<AccounStackParamList, "Authentication">;

interface Props {
  navigation: NotLoggedScreenNavigationProps;
  actions: Routes;
}

const NotLoggedScreen = (props: Props) => {
  const { navigation, actions } = props;

  const onAuthSuccess = () => {
    actions.user.fetchUser(auth.currentUser.email)
      .then(() => {
        navigation.replace("Profile");
      })
  };

  return (
    <View style={styles.container}>
      <Tabs>
        <Tab
          tabStyle={styles.tab}
          activeTabStyle={styles.tab}
          heading="Connexion"
          textStyle={appCommonStyles.text}
          activeTextStyle={appCommonStyles.text}
        >
          <LoginTab
            onAuthSuccess={onAuthSuccess}
          />
        </Tab>
        <Tab
          tabStyle={styles.tab}
          activeTabStyle={styles.tab}
          textStyle={appCommonStyles.text}
          activeTextStyle={appCommonStyles.text}
          heading="Inscription"
        >
          <SigninTab
            onAuthSuccess={onAuthSuccess}
          />
        </Tab>
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appTheme.screenView,
  },

  tab: {
    backgroundColor: appTheme.backgroundColor,
  },
});

export default globalConnect()(NotLoggedScreen);
