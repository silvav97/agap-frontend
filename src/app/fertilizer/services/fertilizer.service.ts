import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Fertilizer, FertilizerPagination } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FertilizerService {

  private readonly baseUrl: string = environment.baseUrl;
  private router = inject( Router)
  private http = inject( HttpClient)


  constructor() {}


  public getFertilizerList(token: string | null): Observable<Fertilizer[]> {
    const url = `${ this.baseUrl }/api/v1/fertilizers`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Fertilizer[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getFertilizerPaginated(page: number, token: string | null): Observable<FertilizerPagination> {
    const url = `${ this.baseUrl }/api/v1/fertilizers/page?pageNumber=${page}&pageSize=4`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<FertilizerPagination>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Fertilizer.Service.getFertilizerPaginated', response);
      }),
      /*map((response) => {
        (response.content).map(fertilizer => {
          fertilizer.nombre = fertilizer.nombre.toUpperCase();
          return fertilizer;
        });
        return response;
      })*/
    )
  }
}
