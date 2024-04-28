import { Injectable } from "@angular/core";
import { FormConfig, FormConfigs } from "../interfaces/form-config.interface";


@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  private configs: FormConfigs = {
    pesticide: {
      title: 'Pesticide',
      fields: [
        { name: 'name', type: 'text', label: 'Name' },
        { name: 'brand', type: 'text', label: 'Brand' },
        { name: 'pricePerGram', type: 'number', label: 'PricePerGram' }
      ]
    },
    crop: {
      title: 'Crop',
      fields: [
        { name: 'variety', type: 'text', label: 'Variety' },

      ]
    }

  };

  public getFormConfig(entityType: string): FormConfig {
    return this.configs[entityType];
  }
}

