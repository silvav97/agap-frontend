import { CropResponse } from "../../crop/interfaces";


export interface CropReportResponse {
  id:              number,
  crop:            CropResponse,
  totalSale:       number,
  assignedBudget:  number,
  expectedExpense: number,
  realExpense:     number,
  profit:          number,
  profitability:   number,
}
