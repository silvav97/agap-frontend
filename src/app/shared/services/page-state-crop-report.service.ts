
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateCropReportService {

  private pageSizeSourceCropReport = new BehaviorSubject<number>(5);
  public currentPageSizeCropReport = this.pageSizeSourceCropReport.asObservable();

  changePageSizeCropReport(size: number) {
    this.pageSizeSourceCropReport.next(size);
  }

}
