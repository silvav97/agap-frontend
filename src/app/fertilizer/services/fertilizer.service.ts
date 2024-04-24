import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Fertilizer, FertilizerPagination } from '../interfaces';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FertilizerService {

  private readonly baseUrl: string = environment.baseUrl;
  private router = inject( Router)
  private http = inject( HttpClient)


  constructor() {}


  public getFertilizerList(token: string | null): Observable<Fertilizer[]> {
    const url = `${ this.baseUrl }/api/v1/fertilizer`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Fertilizer[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getFertilizerPaginated(page: number, pageSize: number, token: string | null): Observable<FertilizerPagination> {
    const url = `${ this.baseUrl }/api/v1/fertilizer/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<FertilizerPagination>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Fertilizer.Service.getFertilizerPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getFertilizerById( id: number, token: string | null): Observable<Fertilizer> {
    const url = `${ this.baseUrl }/api/v1/fertilizer/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Fertilizer>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Fertilizer.Service.getFertilizerById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public updateFertilizer( fertilizer: Fertilizer, token: string | null): Observable<Fertilizer> {
    const url = `${ this.baseUrl }/api/v1/fertilizer/${fertilizer.id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Fertilizer>( url, fertilizer, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public deleteFertilizerById(id: number, token: string | null): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/fertilizer/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<boolean>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public addFertilizer( fertilizer: Fertilizer, token: string | null ): Observable<Fertilizer> {
    const url = `${ this.baseUrl }/api/v1/fertilizer`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Fertilizer>( url, fertilizer, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }
}
