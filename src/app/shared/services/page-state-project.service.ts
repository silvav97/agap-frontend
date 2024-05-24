import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateProjectService {

  private pageSizeSourceProject = new BehaviorSubject<number>(3);
  public currentPageSizeProject = this.pageSizeSourceProject.asObservable();

  changePageSizeProject(size: number) {
    this.pageSizeSourceProject.next(size);
  }

}
