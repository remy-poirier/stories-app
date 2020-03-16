import { createSelector } from 'reselect';
import { RootState } from "../reducer/mainReducer";

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

const extractReadList = (state: RootState) => state.user.readList;
const readListSelector = createSelector(
  extractReadList,
  (readList) => readList,
);

export const getUserReadList = (state: RootState) => readListSelector(state);

