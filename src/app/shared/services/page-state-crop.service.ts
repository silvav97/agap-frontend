
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateCropService {

  private pageSizeSourceCrop = new BehaviorSubject<number>(5);
  public currentPageSizeCrop = this.pageSizeSourceCrop.asObservable();

  changePageSizeCrop(size: number) {
    this.pageSizeSourceCrop.next(size);
  }

}
