import React, { useState } from 'react';
import { View, Text, Button, Toast, Spinner } from "native-base";
import { appCommonStyles } from "src/common/styles/styles";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import isEmail from "validator/lib/isEmail";
import globalConnect from "src/redux/actions/utils";
import { Routes } from "src/redux/actions/GlobalActions";


interface Props {
  actions: Routes;
  onAuthSuccess: () => void;
}

const SigninTab = (props: Props) => {
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

  const isUsernameValid = (username: any): boolean => {
    return username && username.length > 3;
  };

  const isPwdValid = (pwd: any): boolean => {
    return pwd && pwd.length > 7;
  };

  const isPwdConfirmValid = (pwd: any, pwdC: any): boolean => {
    return pwd && pwdC && pwd === pwdC;
  };

  const isFormValid = (data: any): boolean => {
    return data.email && isEmailValid(data.email.value) && data.username && isUsernameValid(data.username.value)
      && data.fieldPwd && isPwdValid(data.fieldPwd.value) && data.fieldPwdC
      && isPwdConfirmValid(data.fieldPwd.value, data.fieldPwdC.value);
  };

  const onSubmit = (data: any) => {

    if (Object.keys(data).length > 0) {
      // Process to validation

      if (isFormValid(data)) {

        setIsLoading(true);

        actions.user.isUsernameAvailable(data.username.value)
          .then((isAvailable: boolean) => {
            if (isAvailable) {
              actions.user.signIn(data.email.value.toLowerCase(), data.fieldPwd.value, data.username.value)
                .then(() => {
                  setIsLoading(false);
                  onAuthSuccess();
                })
                .catch(() => setIsLoading(false));
            } else {
              setIsLoading(false);
              setError("username", "unicity", "Ce nom d'utilisateur est déjà utilisé");
            }
          })
          .catch(() => {
            setIsLoading(false);
          })
      } else {
        if (data.email && !isEmailValid(data.email.value)) {
          setError("email", "validate", "Email invalide");
        }

        if (data.username && isUsernameValid(data.username.value)) {
          setError("username", "validity", "Nom d'utilisateur invalide");
        }

        if (data.fieldPwd && isPwdValid(data.fieldPwd.value)) {
          setError("fieldPwd", "validity", "Mot de passe incorrect");
        }

        if (data.fieldPwd && data.fieldPwdC && isPwdConfirmValid(data.fieldPwd.value, data.fieldPwdC.value)) {
          setError("fieldPwdC", "validity", "Les mots de passe ne sont pas identiques");
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

      <Text style={{...appCommonStyles.text, ...appCommonStyles.baseMTop}}>Nom d'utilisateur</Text>
      <Controller
        as={TextInput}
        placeholder="ex: JohnDoe"
        placeholderTextColor="grey"
        style={styles.input}
        control={control}
        name="username"
        onChange={onChange("username")}
        defaultValue=""
      />
      {errors.username && (
        <Text style={appCommonStyles.textError}>
          {errors.username ? errors.username.message : ""}
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

      <Text style={{...appCommonStyles.text, ...appCommonStyles.baseMTop}}>Confirmation du mot de passe</Text>
      <Controller
        as={TextInput}
        placeholder="Doit être identique au mot de passe"
        placeholderTextColor="grey"
        style={styles.input}
        control={control}
        name="fieldPwdC"
        onChange={onChange("fieldPwdC")}
        defaultValue=""
        secureTextEntry
      />
      {errors.username && (
        <Text style={appCommonStyles.textError}>
          {errors.fieldPwdC ? errors.fieldPwdC.message : ""}
        </Text>
      )}

      {isLoading && <Spinner /> }

      {!isLoading && (
        <Button style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={appCommonStyles.text}>
            Inscription
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

export default globalConnect()(SigninTab);
