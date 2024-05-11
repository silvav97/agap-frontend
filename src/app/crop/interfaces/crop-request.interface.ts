

export interface CropRequest {
  id?:                  number;
  projectApplicationId: number;
  startDate:            Date;
  endDate:              Date;
  expectedExpense:      number;
  assignedBudget:       number;
}
