
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateProjectApplicationService {

  private pageSizeSourceProjectApplication = new BehaviorSubject<number>(5);
  public currentPageSizeProjectApplication = this.pageSizeSourceProjectApplication.asObservable();

  changePageSizeProjectApplication(size: number) {
    this.pageSizeSourceProjectApplication.next(size);
  }

}
