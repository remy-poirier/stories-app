import React, { useCallback, useEffect, useState } from 'react';
import { Text, Toast, View } from "native-base";
import globalConnect from "../../../../redux/actions/utils";
import { RootState } from "../../../../redux/reducer/mainReducer";
import { getUserReadList } from "../../../../redux/selectors/userSelector";
import { Story } from "../../../../models/Story";
import { Routes } from "../../../../redux/actions/GlobalActions";
import StoriesList from "../../../../common/storiesList/StoriesList";
import { AccountScreenNavigationProps } from "../../../../common/typeRoutes/Constants";
import { getStories } from "../../../../redux/selectors/storiesSelector";

interface Props {
  readList: Story[];
  actions: Routes;
  navigation: AccountScreenNavigationProps;
  stories: Story[];
}

const ReadList = (props: Props) => {
  const { readList, actions, navigation, stories } = props;
  
  const [fetchReadList, setFetchReadList] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  useEffect(() => {
    actions.user.getStoriesToReadLater()
      .then(() => setFetchReadList(false))
      .catch(() => setFetchReadList(false))
  }, []);
  
  const onStoryClick = (storyId: string) => {
    navigation.navigate("Story", {
      storyId: storyId
    })
  };
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    actions.user.getStoriesToReadLater()
      .then(() => {
        setTimeout(() => {
          setRefreshing(false);
          Toast.show({
            type: "success",
            text: "Liste mise à jour avec succès"
          })
        }, 500)
    
      })
  }, [refreshing]);
  
  return (
    <>
      <StoriesList
        isFetching={fetchReadList}
        stories={readList}
        isRefreshing={refreshing}
        onRefresh={onRefresh}
        onStoryClick={onStoryClick}
      />
    </>
  );
};

const state2props = (state: RootState) => ({
  readList: getUserReadList(state),
  stories: getStories(state),
});

export default globalConnect(state2props)(ReadList);