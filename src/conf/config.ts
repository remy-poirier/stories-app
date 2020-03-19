import * as Permissions from 'expo-permissions';
import { PermissionStatus } from 'expo-permissions';
import { Notifications } from "expo";
import { db } from "./firebase";

export interface Params {
  isProd: boolean;
}

const isProd: boolean = process.env.NODE_ENV === "production";

/**
 * @desc Get some data about app, some will come from app and some will be injected by
 * this method.
 */
const getParams = (): Params => {
  return {
    isProd: isProd
  };
};

export const config = getParams();

export const registerPushNotifications = () => {

  return Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then((response) => {
      if (response.status !== PermissionStatus.GRANTED){
        console.log("notifications are forbidden");
        return;
      }

      Notifications.setBadgeNumberAsync(0);

      return Notifications.getExpoPushTokenAsync()
        .then((token) => {
          return db.collection("pushTokens")
            .doc(token)
            .get()
            .then((document) => {
              if (!document.exists) {
                return db.collection("pushTokens")
                  .doc(token)
                  .set({
                    token
                  })
              }
            })
        })
    })
};
