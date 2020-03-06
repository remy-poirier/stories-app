import { Message } from "src/message/Constants";
import { ActionTypes } from "src/redux/actions/ActionTypes";

interface State {
  name: string;
  witnessName: string;
  victimName: string;
  messages: Message[];
}

const initialState: State = {
  name: "Chargement...",
  victimName: "",
  witnessName: "",
  messages: []
};

export default function(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.Conversation.RECEIVE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.Conversation.RESET:
      return initialState;
    default:
      return state;
  }
}
