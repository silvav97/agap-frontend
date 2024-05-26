
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateMyCropService {

  private pageSizeSourceMyCrop = new BehaviorSubject<number>(5);
  public currentPageSizeMyCrop = this.pageSizeSourceMyCrop.asObservable();

  changePageSizeMyCrop(size: number) {
    this.pageSizeSourceMyCrop.next(size);
  }

}
