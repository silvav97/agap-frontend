import { ProjectApplicationResponse } from "../../project-application/interfaces";


export interface CropResponse {
  id?:                number;
  projectApplication: ProjectApplicationResponse;
  status:             string;
  startDate:          Date;
  endDate:            Date;
  expectedExpense:   number;
  assignedBudget:    number;
  saleValue:         number;
}

