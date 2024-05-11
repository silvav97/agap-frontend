import { CropType, CropTypeRequest } from "../../crop-type/interfaces";

export interface ProjectResponse {
  id: number;
  cropType?: CropType;
  name: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  municipality: string;
  totalBudget: number;
  imageUrl?: string;
}
