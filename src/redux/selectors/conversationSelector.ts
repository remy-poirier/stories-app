import { RootState } from "src/redux/reducer/mainReducer";
import { createSelector } from "reselect";

const extractConversation = (state: RootState) => state.conversation;
const conversationSelector = createSelector(
  extractConversation,
  (conversation) => conversation,
);

export const getConversation = (state: RootState) => conversationSelector(state);
