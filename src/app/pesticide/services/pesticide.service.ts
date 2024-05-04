import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Pesticide } from '../interfaces';
import { Pagination } from '../../shared/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class PesticideService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )


  constructor() {}


  public getPesticideList(token: string | null): Observable<Pesticide[]> {
    const url = `${ this.baseUrl }/api/v1/pesticide`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pesticide[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getPesticidePaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<Pesticide>> {
    const url = `${ this.baseUrl }/api/v1/pesticide/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<Pesticide>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Pesticide.Service.getPesticidePaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getPesticideById( id: number, token: string | null): Observable<Pesticide> {
    const url = `${ this.baseUrl }/api/v1/pesticide/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pesticide>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Pesticide.Service.getPesticideById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public updatePesticide( pesticide: Pesticide, token: string | null): Observable<Pesticide> {
    const url = `${ this.baseUrl }/api/v1/pesticide/${pesticide.id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Pesticide>( url, pesticide, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public deletePesticideById(id: number, token: string | null): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/pesticide/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<boolean>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public addPesticide( pesticide: Pesticide, token: string | null ): Observable<Pesticide> {
    const url = `${ this.baseUrl }/api/v1/pesticide`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Pesticide>( url, pesticide, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

}
