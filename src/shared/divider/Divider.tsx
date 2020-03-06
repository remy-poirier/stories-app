import React from 'react';
import { StyleSheet } from "react-native";
import { View } from "native-base";

const Divider = () => {
  return (
    <View style={styles.root}/>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 8,
  },
});

export default Divider;
