import { ICategory } from "./ICategory";

export interface IFormData {
  id: number;
  title: string;
  description: string;
  content: string;
  category: ICategory;
  read_by: number;
  date: string;
  author: number;
}
