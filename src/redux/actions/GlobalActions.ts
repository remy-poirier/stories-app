import { auth, db } from "src/conf/firebase";
import bindActionCreators from 'src/redux/actions/bindActionCreators';
import { Story } from "src/models/Story";
import { ActionTypes } from "src/redux/actions/ActionTypes";
import { Message } from "src/message/Constants";
import { User } from "src/models/User";
import { LikeTypes } from "src/models/Like";
import { guidGenerator } from "src/common/utils";
import { Conversation, defaultConversation } from "src/conversation/Constants";

const actions = {

  user: {
    fetchUser: (email: string) => (dispatch: any) => {
      return db.collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            dispatch({
              type:    ActionTypes.User.STATUS_UPDATE,
              payload: querySnapshot.docs[0].data()
            })
          }
        })
    },

    isUsernameAvailable: (username: string) => (dispatch: any) => {
      return db.collection("users")
        .where("displayName", "==", username)
        .get()
        .then((querySnapshot) => querySnapshot.size === 0)
        .catch(() => true)
    },

    signIn: (email: string, pwd: string, username: string) => (dispatch: any) => {
      return auth.createUserWithEmailAndPassword(
        email, pwd,
      )
        .then(() => {
          const { currentUser } = auth;
          const user: User = {
            id:          currentUser ? currentUser.uid : "",
            displayName: username,
            isAdmin:     false,
            email,
          };

          return db.collection("users")
            .doc(user.id)
            .set(user)
            .then(() => true)
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          throw error;
        })
    },

    logout: () => (dispatch: any) => auth.signOut()
      .then(() => {
        dispatch({
          type:    ActionTypes.User.STATUS_UPDATE,
          payload: null,
        });
      }),

    login: (email: string, password: string) => () => {
      return auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          return true;
        })
    },

    getNbOfStoriesPublished: () => (dispatch: any) => {
      return db.collection("stories")
        .where("authorId", "==", auth.currentUser.uid)
        .where("isVisible", "==", true)
        .get()
        .then((querySnapshot) => {
          dispatch({
            type: ActionTypes.User.RECEIVE_NB_OF_STORIES,
            payload: querySnapshot.size,
          });
          return querySnapshot.size;
        })
        .catch((error) => {
          throw error;
        })
    }


  },

  stories: {
    fetch: () => (dispatch: any) => db.collection("stories")
      .where("isVisible", "==", true)
      .get()
      .then((querySnapshot) => {
        const stories: Story[] = [];
        querySnapshot.forEach((doc) => {
          const s = doc.data() as Story;
          stories.push(s);
        });
        dispatch({
          type: ActionTypes.Stories.RECEIVE_ALL,
          payload: stories,
        });
        return stories;
      }),
  },

  conversation: {
    get: (storyId: string) => (dispatch: any) => db.collection("stories")
      .doc(storyId)
      .get()
      .then((doc) => {
        let finalObject: Conversation = defaultConversation();
        if (doc.exists) {
          finalObject = doc.data() as Conversation;

          // Check if user has liked story
          if (auth.currentUser) {
            db.collection("likes")
              .where("storyId", "==", storyId)
              .where("userId", "==", auth.currentUser.uid)
              .get()
              .then((querySnapshot) => {
                if(querySnapshot.size > 0) {
                  finalObject.isLiked = true;
                  dispatch({
                    type: ActionTypes.Conversation.CONNECTED_USER_HAS_LIKED,
                  })
                }
              })
          }

          db.collection("messages")
            .where("storyId", "==", storyId)
            .orderBy("order")
            .get()
            .then((querySnapshot) => {
              const messages: Message[] = [];
              querySnapshot.forEach((doc) => {
                messages.push(doc.data() as Message )
              });

              finalObject.messages = messages;

              dispatch({
                type: ActionTypes.Conversation.RECEIVE,
                payload: finalObject
              });
            })
        }

        return finalObject;

      }),

    reset: () => (dispatch: any) => {
      return dispatch({
        type: ActionTypes.Conversation.RESET,
      })
    },

    like: (storyId: string) => (dispatch: any) => {
      return db.collection("likes")
        .add({
          id:      guidGenerator(),
          storyId: storyId,
          userId: auth.currentUser.uid,
          type: LikeTypes.Like
        })
        .then(() => {
          db.collection("stories")
            .doc(storyId)
            .get()
            .then((querySnapshot) => {
              const nbLikes = querySnapshot.data().nbLikes || 0;
              return db.collection("stories")
                .doc(storyId)
                .set({
                  ...querySnapshot.data(),
                  nbLikes: nbLikes + 1
                })
            });
          dispatch({
            type: ActionTypes.Conversation.LIKE,
            payload: storyId,
          });
          // TODO dispatch an action that will be interpreted by stories Reducer and increment nbLikes of this item
        })
        .catch((error) => {
          throw error;
        })
    },

    dislike: (storyId: string) => (dispatch: any) => {
      return db.collection("likes")
        .where("storyId", "==", storyId)
        .where("userId", "==", auth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            return db.collection("likes")
              .doc(querySnapshot.docs[0].id)
              .delete()
              .then(() => {
                return db.collection("stories")
                  .doc(storyId)
                  .get()
                  .then((querySnapshot) => {
                    const nbLikes = querySnapshot.data().nbLikes || 0;
                    return db.collection("stories")
                      .doc(storyId)
                      .set({
                        ...querySnapshot.data(),
                        nbLikes: nbLikes - 1
                      })
                      .then(() => {
                        dispatch({
                          type: ActionTypes.Conversation.DISLIKE,
                          payload: storyId,
                        });
                      })
                  });

              })
          }
        })
        .catch((error) => {
          throw error;
        })
    }
  }
};

export type Routes = typeof actions;
export const routes = { actions };
export const actionBuilder = (dispatch: any) => bindActionCreators(routes, dispatch);
