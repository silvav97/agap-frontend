import { ProjectResponse } from "../../project/interfaces";
import { UserResponse } from "../../user/interfaces";


export interface ProjectApplicationResponse {
  id: number;
  project: ProjectResponse;
  applicant: UserResponse;
  applicationStatus: string;
  applicationDate: Date;
  reviewDate: Date;
  farmName: string;
  area: number;
  municipality: string;
  weather: string;
}
