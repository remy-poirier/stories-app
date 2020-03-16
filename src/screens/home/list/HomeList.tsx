import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from "react-native";
import { RootState } from "src/redux/reducer/mainReducer";
import { getStories } from "src/redux/selectors/storiesSelector";
import globalConnect from "src/redux/actions/utils";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/common/typeRoutes/Constants";
import { Routes } from "src/redux/actions/GlobalActions";
import { Story } from "src/models/Story";
import { Icon, Text, Toast, View } from "native-base";
import { appCommonStyles, appTheme } from "src/common/styles/styles";
import StoriesList from "src/common/storiesList/StoriesList";
import { Modal } from "@ui-kitten/components";
import orderBy from "lodash/orderBy";

export enum Filters {
  Popular = "Populaire",
  New = "Nouveau",
  Horror = "Horreur",
  Romance = "Romance",
  Paranormal = "Paranormal",
  SciFi = "Science-Fiction",
}

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, "Home">;

export enum SelectEntryParent {
  Category = "category",
  Sort = "sort",
}

export interface SelectEntry {
  name: string;
  id: number;
  value: string;
  parent: SelectEntryParent;
}
interface Props {
  navigation: HomeScreenNavigationProps;
  actions: Routes;
  stories: Story[];
}

const HomeList = (props: Props) => {
  const { navigation, actions, stories } = props;

  const [fetchStories, setFetchStories] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [storiesToDisplay, setStoriesToDisplay] = useState<Story[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filters>(Filters.New);

  const onToggleFilters = (isVisible: boolean) => () => {
    setFiltersVisible(isVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="FontAwesome5"
          onPress={onToggleFilters(true)}
          style={{marginRight: 16, color: "white", fontSize: 20}}
          name="sliders-h"
        />
      )
    });

    actions.stories.fetch().then(() => {
      setFetchStories(false)
    })
  }, []);

  useEffect(() => {
    if (!fetchStories && stories.length === 0) {
      setFetchStories(true);
      actions.stories.fetch()
        .then(() => {
          setFetchStories(false)
        })
    }
  }, [fetchStories, stories]);

  useEffect(() => {
    setStoriesToDisplay(stories);
  }, [stories]);

  const onStoryClick = (storyId: string) => {
    navigation.push("Story", {
      storyId,
    })
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    actions.stories.fetch()
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

  // For now, we can only filters on newest and nbLikes
  const filterToDbField = (): string => {
    if (activeFilter === Filters.Popular) {
      return "nbLikes"
    }

    return "creationDate";
  };

  const renderStories = useCallback(() => {
    if ([Filters.New, Filters.Popular].includes(activeFilter)) {
      return orderBy(storiesToDisplay, [filterToDbField()], "desc");
    }

    return storiesToDisplay.filter((s) => s.category === activeFilter)

  }, [storiesToDisplay, activeFilter]);


  const onFilterChange = (filter: Filters) => () => {
    setActiveFilter(filter);
    setFiltersVisible(false)
  };

  return (
    <>
      <StoriesList
        isFetching={fetchStories}
        isRefreshing={refreshing}
        onRefresh={onRefresh}
        onStoryClick={onStoryClick}
        stories={renderStories()}
      />
      <Modal
        visible={filtersVisible}
        backdropStyle={styles.backdropModal}
        onBackdropPress={onToggleFilters(false)}
      >
        <View style={styles.modalContainer}>
          {Object.values(Filters).map((fItem: Filters, index) => (
            <Text
              key={fItem}
              style={{
                ...styles.filterItem,
                marginTop: index === 0 ? 0 : 16,
                marginBottom: index + 1 === Object.values(Filters).length ? 0 : 16,
                color: activeFilter === fItem ? appTheme.primaryColor : "grey",
              }}
              onPress={onFilterChange(fItem)}
            >
              {fItem}
            </Text>
          ))}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({

  selectContainer: {
    backgroundColor: appTheme.background.default,
    marginVertical: 64,
    borderWidth: 1,
    borderColor: appTheme.primaryColor,
  },

  selectSearchBar: {
    backgroundColor: appTheme.background.default,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.primaryColor,
  },

  selectChipContainer: {
    borderColor: appTheme.primaryColor,
  },

  backdropModal: {
    backgroundColor: "rgba(0,0,0,0.92)",
  },

  modalContainer: {
    padding: 16,
    margin: 32,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flex: 1,
    borderRadius: 8,
  },

  filterTitle: {
    ...appCommonStyles.text,
    fontSize: 30,
  },

  filterItem: {
    ...appCommonStyles.baseMTop,
    ...appCommonStyles.text,
    color: "grey",
    marginVertical: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  }

});

const stateToProps = (state: RootState) => ({
  stories: getStories(state),
});

export default globalConnect(stateToProps)(HomeList);
