

export interface CropTypeRequest {
  id?: number;
  weather: string;
  name: string;
  plantQuantityPerSquareMeter: number;
  harvestTime: number;
  fertilizerQuantityPerPlant: number;
  fertilizerFrequency: number;
  pesticideQuantityPerPlant: number;
  pesticideFrequency: number;
  fertilizerId: number;
  pesticideId: number;
}
