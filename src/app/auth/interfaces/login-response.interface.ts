import { User } from "./user.interface";

export interface LoginResponse {
  user: User
  access_token: string;
  refresh_token: string;
}
