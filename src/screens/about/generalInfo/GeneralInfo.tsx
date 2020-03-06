import React from 'react';
import { View, Text, Button, H1 } from "native-base";
import { Linking, StyleSheet } from "react-native";
import Divider from "src/shared/divider/Divider";
import { appTheme } from "src/common/styles/styles";

const GeneralInfo = () => {
  const goToWebsite = () => {
    Linking.openURL("https://react-native-stories.web.app/")
  };

  return (
    <View style={styles.bg}>
      <Text style={styles.text}>
        Cette page regroupe diverses informations qui peuvent vous être utile lorsque vous utilisez
        l'application
      </Text>

      <Divider />

      <Text style={styles.sectionTitle}>Comment ajouter une nouvelle histoire</Text>

      <Text style={styles.text}>
        L'ajout et l'édition d'histoire se déroule via le site internet dédié à cette application auquel
        vous pouvez accéder en cliquant sur le bouton ci-dessous
      </Text>
      <Button style={styles.goToWebsite} onPress={goToWebsite}>
        <Text>
          Accéder au site
        </Text>
      </Button>

      <Text style={styles.text}>
        Il n'est pas possible d'ajouter des histoires pour le moment via l'application, et ce n'est pas non plus prévu dans un futur
        proche. L'application a été créée récemment, et toutes les fonctionnalités ne sont pas encore disponibles
        nativement.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    display: "flex",
    backgroundColor: appTheme.backgroundColor,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },


  text: {
    color: "white",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginVertical: 8,
    color: "white",
  },

  goToWebsite: {
    marginVertical: 8,
    backgroundColor: appTheme.primaryColor
  }
});

export default GeneralInfo;
