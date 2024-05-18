import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Pagination } from "../../shared/interfaces/pagination.interface";
import { CropRequest, CropResponse } from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class CropService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )

  constructor() {}

  public getCropList(token: string | null): Observable<CropResponse[]> {
    const url = `${ this.baseUrl }/api/v1/crop`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CropResponse[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getCropPaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<CropResponse>> {
    let url = `${ this.baseUrl }/api/v1/crop/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<CropResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Crop.Service.getCropPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getMyCropPaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<CropResponse>> {
    let url = `${ this.baseUrl }/api/v1/crop/mine/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<CropResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Crop.Service.getMyCropPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }





  public getCropById( id: number, token: string | null): Observable<CropResponse> {
    const url = `${ this.baseUrl }/api/v1/crop/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CropResponse>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Crop.Service.getCropById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }


  public updateCrop( cropRequest: CropRequest, token: string | null): Observable<CropResponse> {
    const url = `${ this.baseUrl }/api/v1/crop/${cropRequest.id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<CropResponse>( url, cropRequest, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }


  public deleteCropById(id: number, token: string | null): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/crop/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<boolean>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public finishCrop(id: number, saleValue: number, token: string | null): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/crop/${id}/finish`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<boolean>( url, saleValue, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public addCrop( cropRequest: CropRequest, token: string | null ): Observable<CropResponse> {
    const url = `${ this.baseUrl }/api/v1/crop`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<CropResponse>( url, cropRequest, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

}
