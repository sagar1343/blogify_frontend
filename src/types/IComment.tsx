import { IUser } from "./IUser";

export interface IComment {
  id: number;
  comment: string;
  object_id: number;
  content_type: number;
  commented_at: string;
  user: IUser;
}
