import { RootState } from "src/redux/reducer/mainReducer";
import { createSelector } from "reselect";

const extractStories = (state: RootState) => state.stories.stories;
const storiesSelector = createSelector(
  extractStories,
  (stories) => stories,
);

export const getStories = (state: RootState) => storiesSelector(state);
