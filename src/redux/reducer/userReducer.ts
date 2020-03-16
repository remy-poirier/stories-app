import { ActionTypes } from "src/redux/actions/ActionTypes";
import { User } from "src/models/User";
import { Story } from "../../models/Story";

interface State {
  user: User | null;
  publishedStories: number;
  readList: Story[];
}

const initialState: State = {
  user: null,
  publishedStories: 0,
  readList: [],
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
    case ActionTypes.User.RECEIVE_READLIST:
      return {
        ...state,
        readList: action.payload,
      };
    case ActionTypes.Stories.INCREMENT_NB_VIEWS:
      if (state.readList.filter((story) => story.id === action.payload).length > 0) {
        return {
          ...state,
          readList: state.readList.map((story) => {
            if (story.id === action.payload) {
              return {
                ...story,
                nbReads: story.nbReads + 1,
              }
            }
  
            return story;
          })
        }
      }
      
      return state;
    case ActionTypes.Conversation.LIKE:
      if (state.readList.filter((story) => story.id === action.payload).length > 0) {
        return {
          ...state,
          readList: state.readList.map((story) => {
            if (story.id === action.payload) {
              return {
                ...story,
                nbLikes: (story.nbLikes || 0) + 1
              }
            }
            return story;
          })
        };
      }
      
      return state;
    case ActionTypes.Conversation.DISLIKE:
      if (state.readList.filter((story) => story.id === action.payload).length > 0) {
        return {
          ...state,
          readList: state.readList.map((story) => {
            if (story.id === action.payload) {
              return {
                ...story,
                nbLikes: story.nbLikes ? story.nbLikes - 1 : 0
              }
            }
            return story;
          })
        };
      }
  
      return state;
    case ActionTypes.Stories.ADD_TO_READLIST:
      return {
        ...state,
        readList: [...state.readList, action.payload.story],
      };
    case ActionTypes.Stories.REMOVE_FROM_READLIST:
      return {
        ...state,
        readList: state.readList.filter((story) => story.id !== action.payload.story.id)
      }
    default:
      return state;
  }
}
