import { Story } from "src/models/Story";
import { ActionTypes } from "src/redux/actions/ActionTypes";

interface State {
  stories: Story[],
}

const initialState: State = {
  stories: []
};

export default function storiesReducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.Stories.RECEIVE_ALL:
      return {
        ...state,
        stories: action.payload,
      };
    default:
      return state;
  }
}
