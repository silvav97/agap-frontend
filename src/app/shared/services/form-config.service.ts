import { Injectable, inject } from "@angular/core";
import { FormConfig, FormConfigs } from "../interfaces/form-config.interface";
import { PesticideService } from "../../pesticide/services/pesticide.service";
import { FertilizerService } from "../../fertilizer/services/fertilizer.service";


@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  private pesticideService  = inject( PesticideService );
  private fertilizerService = inject( FertilizerService );

  private configs: FormConfigs = {
    pesticide: {
      title: 'Pesticide',
      service: this.pesticideService,
      fields: [
        { name: 'name', type: 'text', label: 'Name' },
        { name: 'brand', type: 'text', label: 'Brand' },
        { name: 'pricePerGram', type: 'number', label: 'PricePerGram' }
      ]
    },
    fertilizer: {
      title: 'Fertilizer',
      service: this.fertilizerService,
      fields: [
        { name: 'name', type: 'text', label: 'Name' },
        { name: 'brand', type: 'text', label: 'Brand' },
        { name: 'pricePerGram', type: 'number', label: 'PricePerGram' }
      ]
    }
  };

  public getFormConfig(entityType: string): FormConfig {
    return this.configs[entityType];
  }
}

