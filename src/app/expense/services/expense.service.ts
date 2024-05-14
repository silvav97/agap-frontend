import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ExpenseResponse } from "../interfaces";
import { Pagination } from "../../shared/interfaces";



@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )

  constructor() {}

  public getExpenseList(token: string | null): Observable<ExpenseResponse[]> {
    const url = `${ this.baseUrl }/api/v1/expense`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ExpenseResponse[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getExpensePaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<ExpenseResponse>> {
    let url = `${ this.baseUrl }/api/v1/expense/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<ExpenseResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Expense.Service.getExpensePaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getExpensesByCropIdPaginated(page: number, pageSize: number, token: string | null, cropId: number): Observable<Pagination<ExpenseResponse>> {
    let url = `${ this.baseUrl }/api/v1/expense/byCropId/${cropId}/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<ExpenseResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Expense.Service.getExpensesByCropIdPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

}
