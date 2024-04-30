import { Fertilizer } from "../../fertilizer/interfaces";
import { Pesticide } from "../../pesticide/interfaces";


export interface CropType {
  id: number;
  weather: string;
  name: string;
  plantQuantityPerSquareMeter: number;
  harvestTime: number;
  fertilizerQuantityPerPlant: number;
  fertilizerFrequency: number;
  pesticideQuantityPerPlant: number;
  pesticideFrequency: number;
  fertilizer: Fertilizer;
  pesticide: Pesticide;
}
