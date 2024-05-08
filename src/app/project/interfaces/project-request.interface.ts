

export interface ProjectRequest {
  id: number;
  cropTypeId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  municipality: string;
  totalBudget: number;
  imageUrl?: string;
}
