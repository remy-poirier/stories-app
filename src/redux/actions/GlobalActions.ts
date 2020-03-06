import { db } from "src/conf/firebase";
import bindActionCreators from 'src/redux/actions/bindActionCreators';
import { Story } from "src/models/Story";
import { ActionTypes } from "src/redux/actions/ActionTypes";
import { Message } from "src/message/Constants";

const actions = {
  stories: {
    fetch: () => (dispatch: any) => db.collection("stories")
      .where("isVisible", "==", true)
      .get()
      .then((querySnapshot) => {
        const stories: Story[] = [];
        querySnapshot.forEach((doc) => {
          stories.push(doc.data() as Story)
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
        let finalObject = {};
        if (doc.exists) {
          const story = doc.data() as Story;
          finalObject = story;

          db.collection("messages")
            .where("storyId", "==", story.id)
            .orderBy("order")
            .get()
            .then((querySnapshot) => {
              const messages: Message[] = [];
              querySnapshot.forEach((doc) => {
                messages.push(doc.data() as Message )
              });

              finalObject.messages = messages

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
    }
  }
};

export type Routes = typeof actions;
export const routes = { actions };
export const actionBuilder = (dispatch: any) => bindActionCreators(routes, dispatch);
