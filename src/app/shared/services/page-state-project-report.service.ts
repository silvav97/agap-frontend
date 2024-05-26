
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateProjectReportService {

  private pageSizeSourceProjectReport = new BehaviorSubject<number>(5);
  public currentPageSizeProjectReport = this.pageSizeSourceProjectReport.asObservable();

  changePageSizeProjectReport(size: number) {
    this.pageSizeSourceProjectReport.next(size);
  }

}
