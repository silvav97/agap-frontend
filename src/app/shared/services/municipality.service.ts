import { Injectable } from "@angular/core";
import { MUNICIPALITIES, Municipality } from "./municipalities.json";



@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  private municipalityList: Municipality[] = MUNICIPALITIES;

  getAllMunicipalities() {
    return this.municipalityList;
  }

}
