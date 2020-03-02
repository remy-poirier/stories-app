import { Message } from "src/message/Constants";

export interface Conversation {
  messages: Message[];
  victimName: string;
  witnessName: string;
  name: string;
}
