import { User } from "./user.interface";

export interface RefreshTokenResponse {
  user: User
  access_token: string;
  refresh_token: string;
}
