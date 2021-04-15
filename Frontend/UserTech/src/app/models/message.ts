export interface Message {
  message: string;
  type: MessageType;
  id: number;
}

export enum MessageType {
  Error = 'Error',
  Success = 'Success',
}
