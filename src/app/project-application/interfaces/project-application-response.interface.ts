import { User } from "../../auth/interfaces";
import { ProjectResponse } from "../../project/interfaces";


export interface ProjectApplicationResponse {
  id: number;
  project: ProjectResponse;
  applicant: User;
  applicationStatus: string;
  applicationDate: Date;
  reviewDate?: Date;
  adminComment?: string;
}