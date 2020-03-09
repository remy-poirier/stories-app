import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import storiesReducer from "src/redux/reducer/storiesReducer";
import conversationReducer from "src/redux/reducer/conversationReducer";
import userReducer from "src/redux/reducer/userReducer";

const mainReducer =  combineReducers({
  stories:      storiesReducer,
  conversation: conversationReducer,
  user:         userReducer,
});

export const rootReducer = (state: any, action: any): RootState => mainReducer(state, action);
export type RootState = StateType<typeof mainReducer>;
