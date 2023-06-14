import { IUser } from "./user";

export interface IPrompt {
  _id: string;
  creator: IUser;
  prompt: string;
  tag: string;
}
