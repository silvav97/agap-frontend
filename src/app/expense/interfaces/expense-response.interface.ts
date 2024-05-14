import { CropResponse } from "../../crop/interfaces";


export interface ExpenseResponse {
  id:                 number;
  crop:               CropResponse;
  expenseValue:       number;
  expenseDescription: string;
  expenseDate:        Date;
}
