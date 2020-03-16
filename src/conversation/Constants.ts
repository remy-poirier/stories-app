import { Message } from "src/message/Constants";

export interface Conversation {
  id: string;
  messages: Message[];
  victimName: string;
  witnessName: string;
  name: string;
  isLiked: boolean;
  description: string;
  imageUrl: string;
  category: string;
  authorName: string;
  authorId: string;
  isVisible: boolean;
  nbLikes: number;
  readList: string[];
  nbReads: number;
}

export const defaultConversation = (): Conversation => ({
  id: "",
  messages: [],
  victimName: "",
  witnessName: "",
  name: "",
  isLiked: false,
  description: "",
  authorId: "",
  authorName: "",
  category: "",
  imageUrl: "",
  isVisible: false,
  nbLikes: 0,
  nbReads: 0,
  readList: []
});
