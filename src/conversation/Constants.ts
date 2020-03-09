import { Message } from "src/message/Constants";

export interface Conversation {
  id: string;
  messages: Message[];
  victimName: string;
  witnessName: string;
  name: string;
  isLiked: boolean;
}

export const defaultConversation = (): Conversation => ({
  id: "",
  messages: [],
  victimName: "",
  witnessName: "",
  name: "",
  isLiked: false,
});
