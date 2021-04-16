export interface Message {
  message: string;
  type: MessageType;
  date: Date;
}

export enum MessageType {
  Error = 'Error',
  Success = 'Success',
}
