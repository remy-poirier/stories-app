import { Message } from "src/message/Constants";
import { ActionTypes } from "src/redux/actions/ActionTypes";

interface State {
  storyId: string;
  name: string;
  witnessName: string;
  victimName: string;
  messages: Message[];
  isLiked: boolean;
}

const initialState: State = {
  storyId: "",
  name: "Chargement...",
  victimName: "",
  witnessName: "",
  messages: [],
  isLiked: false,
};

export default function(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.Conversation.RECEIVE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.Conversation.LIKE:
      return {
        ...state,
        isLiked: true,
      };
    case ActionTypes.Conversation.DISLIKE:
      return {
        ...state,
        isLiked: false,
      };
    case ActionTypes.Conversation.CONNECTED_USER_HAS_LIKED:
      return {
        ...state,
        isLiked: true,
      };
    case ActionTypes.Conversation.RESET:
      return initialState;
    default:
      return state;
  }
}
