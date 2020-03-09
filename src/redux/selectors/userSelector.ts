import { RootState } from "redux/reducer/mainReducer";
import { createSelector } from 'reselect';

const extractUser = (state: RootState) => state.user.user;
const userSelector = createSelector(
  extractUser,
  (user) => user,
);

export const getUser = (state: RootState) => userSelector(state);

const extractNbOfPublishedStories = (state: RootState) => state.user.publishedStories;
const nbOfPublishedStoriesSelector = createSelector(
  extractNbOfPublishedStories,
  (publishedStories) => publishedStories,
);

export const getNbOfPublishedStories = (state: RootState) => nbOfPublishedStoriesSelector(state);

