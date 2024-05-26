
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateCropTypeService {

  private pageSizeSourceCropType = new BehaviorSubject<number>(5);
  public currentPageSizeCropType = this.pageSizeSourceCropType.asObservable();

  changePageSizeCropType(size: number) {
    this.pageSizeSourceCropType.next(size);
  }

}
