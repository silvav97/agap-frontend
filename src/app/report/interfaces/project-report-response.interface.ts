import { ProjectResponse } from "../../project/interfaces";


export interface ProjectReportResponse {
  id:              number,
  project:         ProjectResponse,
  totalSale:       number,
  totalBudget:     number,
  expectedExpense: number,
  realExpense:     number,
  profit:          number,
  profitability:   number,
}
