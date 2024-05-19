import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageStateService {

  private pageSizeSource = new BehaviorSubject<number>(5);
  public currentPageSize = this.pageSizeSource.asObservable();

  changePageSize(size: number) {
    this.pageSizeSource.next(size);
  }

}
