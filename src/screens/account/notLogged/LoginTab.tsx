import React, { useState } from 'react';
import { View, Text, Toast, Spinner, Button } from "native-base";
import { appCommonStyles } from "src/common/styles/styles";
import globalConnect from "src/redux/actions/utils";
import { StyleSheet, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Routes } from "src/redux/actions/GlobalActions";
import isEmail from "validator/lib/isEmail";

interface Props {
  actions: Routes;
  onAuthSuccess: () => void;
}

const LoginTab = (props: Props) => {
  const { actions, onAuthSuccess } = props;

  const {
    control, handleSubmit, errors, setError, clearError
  } = useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (fieldName: string) => (args: any) => {
    clearError(fieldName);
    return {
      value: args[0].nativeEvent.text,
    }
  };

  const isEmailValid = (email: any): boolean => {
    return email && isEmail(email);
  };

  const isPwdValid = (pwd: any): boolean => {
    return pwd && pwd.length > 7;
  };

  const isFormValid = (data: any): boolean => {
    return data.email && isEmailValid(data.email.value) && data.fieldPwd && isPwdValid(data.fieldPwd.value);
  };

  const onSubmit = (data: any) => {
    if (Object.keys(data).length > 0) {
      if (isFormValid(data)) {
        setIsLoading(true);

        actions.user.login(data.email.value.toLowerCase(), data.fieldPwd.value)
          .then(() => {
            setIsLoading(false);
            onAuthSuccess();
          })
          .catch(() => {
            setIsLoading(false);
            Toast.show({
              text: "Nom d'utilisateur ou mot de passe incorrect",
              type: "danger",
            })
          });

      } else {
        if (data.email && !isEmailValid(data.email.value)) {
          setError("email", "validate", "Email invalide");
        }

        if (data.fieldPwd && isPwdValid(data.fieldPwd.value)) {
          setError("fieldPwd", "validity", "Mot de passe incorrect");
        }
  
        Toast.show({
          text: "Le formulaire contient des erreurs",
          type: "danger",
        })
      }
    } else {
      Toast.show({
        text: "Le formulaire contient des erreurs",
        type: "danger",
      })
    }
  };

  return (
    <View style={appCommonStyles.screenView}>
      <Text style={appCommonStyles.text}>E-mail</Text>
      <Controller
        as={TextInput}
        keyboardType="email-address"
        placeholder="ex: john.doe@gmail.com"
        placeholderTextColor="grey"
        style={styles.input}
        control={control}
        name="email"
        onChange={onChange("email")}
        defaultValue=""
      />
      {errors.email && (
        <Text style={appCommonStyles.textError}>
          {errors.email ? errors.email.message : ""}
        </Text>
      )}

      <Text style={{...appCommonStyles.text, ...appCommonStyles.baseMTop}}>Mot de passe</Text>
      <Controller
        as={TextInput}
        placeholder="Minimum 8 caractères"
        placeholderTextColor="grey"
        style={styles.input}
        control={control}
        name="fieldPwd"
        onChange={onChange("fieldPwd")}
        defaultValue=""
        secureTextEntry
      />
      
      {errors.fieldPwd && (
        <Text style={appCommonStyles.textError}>
          {errors.fieldPwd ? errors.fieldPwd.message : ""}
        </Text>
      )}

      {isLoading && <Spinner /> }

      {!isLoading && (
        <Button style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={appCommonStyles.text}>
            Connexion
          </Text>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    marginTop: 16,
  },

  input: {
    color: "white",
    borderWidth: 2,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    height: 40,
  },

});

export default globalConnect()(LoginTab);
