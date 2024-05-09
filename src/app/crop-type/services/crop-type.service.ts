import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CropType, CropTypeRequest } from '../interfaces';
import { Pagination } from '../../shared/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class CropTypeService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )


  constructor() {}


  public getCropTypeList(token: string | null): Observable<CropType[]> {
    const url = `${ this.baseUrl }/api/v1/cropType`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CropType[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getCropTypePaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<CropType>> {
    const url = `${ this.baseUrl }/api/v1/cropType/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<CropType>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('CropType.Service.getCropTypePaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getCropTypeById( id: number, token: string | null): Observable<CropType> {
    const url = `${ this.baseUrl }/api/v1/cropType/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CropType>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('CropType.Service.getCropTypeById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public updateCropType( cropType: CropTypeRequest, token: string | null): Observable<CropType> {
    const url = `${ this.baseUrl }/api/v1/cropType/${cropType.id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<CropType>( url, cropType, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public deleteCropTypeById(id: number, token: string | null): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/cropType/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<boolean>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public addCropType( cropType: CropTypeRequest, token: string | null ): Observable<CropType> {
    const url = `${ this.baseUrl }/api/v1/cropType`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<CropType>( url, cropType, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public getRelatedProjects(id: number, token: string | null): Observable<string[]> {
    const url = `${ this.baseUrl }/api/v1/cropType/${id}/relatedProjects`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<string[]>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

}
