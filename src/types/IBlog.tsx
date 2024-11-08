import { IUser } from "./IUser";
import { ICategory } from "./ICategory";

export interface IBlog {
  id: number;
  title: string;
  description: string;
  content: string;
  category: ICategory;
  read_by: number;
  date: string;
  author: IUser;
}
