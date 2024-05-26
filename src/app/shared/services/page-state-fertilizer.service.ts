
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateFertilizerService {

  private pageSizeSourceFertilizer = new BehaviorSubject<number>(5);
  public currentPageSizeFertilizer = this.pageSizeSourceFertilizer.asObservable();

  changePageSizeFertilizer(size: number) {
    this.pageSizeSourceFertilizer.next(size);
  }

}
