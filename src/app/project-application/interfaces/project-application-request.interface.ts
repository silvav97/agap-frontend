


export interface ProjectApplicationRequest {
  id: number;
  projectId: number;
  applicantId: number;
  //applicationStatus: string;
  applicationDate: Date;
  reviewDate?: Date;
  adminComment?: string;
}
