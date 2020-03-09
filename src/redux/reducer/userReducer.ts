import { ActionTypes } from "src/redux/actions/ActionTypes";
import { User } from "src/models/User";

interface State {
  user: User | null;
  publishedStories: number;
}

const initialState: State = {
  user: null,
  publishedStories: 0,
};

export default function (state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.User.STATUS_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.User.RECEIVE_NB_OF_STORIES:
      return {
        ...state,
        publishedStories: action.payload,
      };
    default:
      return state;
  }
}
