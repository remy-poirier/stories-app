export enum MessageSender {
  Witness = "WITNESS",
  Victim = "VICTIM",
  Narrator = "NARRATOR"
}

export interface Message {
  id: number;
  message: string;
  from: MessageSender;
}
