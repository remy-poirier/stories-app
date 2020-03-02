export enum MessageSender {
  Witness = "WITNESS",
  Victim = "VICTIM",
  Narrator = "NARRATOR"
}

export interface Message {
  id: number;
  order: number;
  text: string;
  storyId: string;
  from: MessageSender;
}
