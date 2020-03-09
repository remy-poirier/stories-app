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
    case ActionTypes.Conversation.LIKE:
      return {
        ...state,
        stories: state.stories.map((story) => {
          if (story.id === action.payload) {
            return {
              ...story,
              nbLikes: (story.nbLikes || 0) + 1
            }
          }
          return story;
        })
      };
    case ActionTypes.Conversation.DISLIKE:
      return {
        ...state,
        stories: state.stories.map((story) => {
          if (story.id === action.payload) {
            return {
              ...story,
              nbLikes: story.nbLikes ? story.nbLikes - 1 : 0
            }
          }
          return story;
        })
      };
    default:
      return state;
  }
}
