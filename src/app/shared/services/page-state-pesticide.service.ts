
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStatePesticideService {

  private pageSizeSourcePesticide = new BehaviorSubject<number>(5);
  public currentPageSizePesticide = this.pageSizeSourcePesticide.asObservable();

  changePageSizePesticide(size: number) {
    this.pageSizeSourcePesticide.next(size);
  }

}
