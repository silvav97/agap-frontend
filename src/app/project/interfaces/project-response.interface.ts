import { CropType, CropTypeRequest } from "../../crop-type/interfaces";

export interface ProjectResponse {
  id: number;
  name: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  municipality: string;
  totalBudget: number;
  cropType?: CropType;
  imageUrl?: string;
}
