
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PageStateExpenseService {

  private pageSizeSourceExpense = new BehaviorSubject<number>(5);
  public currentPageSizeExpense = this.pageSizeSourceExpense.asObservable();

  changePageSizeExpense(size: number) {
    this.pageSizeSourceExpense.next(size);
  }

}
