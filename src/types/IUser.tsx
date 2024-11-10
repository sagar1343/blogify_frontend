export interface IUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female" | "Other" | "";
  profile_picture_url: string;
}
