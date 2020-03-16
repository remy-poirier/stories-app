import { Story } from "../models/Story";

export const guidGenerator = () => {
  const s4 = () => {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4());
};

export const mapQuerySnapshotToStories = (querySnapshot: any): Story[] => {
  const stories: Story[] = [];
  querySnapshot.forEach((doc) => {
    const s = doc.data() as Story;
    stories.push(s);
  });
  return stories;
};
