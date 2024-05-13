import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class PageStateService {

  private pageSizeSource = new BehaviorSubject<number>(10);
  currentPageSize = this.pageSizeSource.asObservable();

  constructor() {}

  changePageSize(size: number) {
    console.log('Page size changed in service to:', size);
    this.pageSizeSource.next(size);
  }

}
