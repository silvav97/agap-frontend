
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateMyProjectApplicationService {

  private pageSizeSourceMyProjectApplication = new BehaviorSubject<number>(5);
  public currentPageSizeMyProjectApplication = this.pageSizeSourceMyProjectApplication.asObservable();

  changePageSizeMyProjectApplication(size: number) {
    this.pageSizeSourceMyProjectApplication.next(size);
  }

}
