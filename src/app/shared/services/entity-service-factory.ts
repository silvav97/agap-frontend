import { Injectable, inject } from "@angular/core";
import { PesticideService } from "../../pesticide/services/pesticide.service";
import { FertilizerService } from "../../fertilizer/services/fertilizer.service";

@Injectable({ providedIn: 'root' })
export class EntityServiceFactory {

  private pesticideService  = inject( PesticideService );
  private fertilizerService = inject( FertilizerService );


  getService(entityType: string): any {
    switch (entityType) {

      case 'pesticide':
          return this.pesticideService;

      case 'fertilizer':
          return this.fertilizerService;
    }
  }
}
