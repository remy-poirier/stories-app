export interface Story {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  witnessName: string;
  victimName: string;
  authorName: string;
  authorId: string;
  isVisible: boolean;
  nbLikes: number;
  readList: string[];
  nbReads: number;
  messages: [];
}
