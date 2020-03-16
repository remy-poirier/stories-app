import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Story: { storyId: string};
};

export type AccountStackParamList = {
  Authentication: undefined;
  Profile: undefined;
  ReadList: undefined;
  Story: { storyId: string };
  
}

export type AccountScreenNavigationProps = StackNavigationProp<AccountStackParamList, "Profile">;
