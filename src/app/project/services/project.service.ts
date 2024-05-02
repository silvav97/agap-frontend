import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ProjectResponse } from "../interfaces/project-response.interface";
import { Pagination } from "../../shared/interfaces/pagination.interface";


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )


  constructor() {}


  public getProjectList(token: string | null): Observable<ProjectResponse[]> {
    const url = `${ this.baseUrl }/api/v1/project`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProjectResponse[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getProjectPaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<ProjectResponse>> {
    const url = `${ this.baseUrl }/api/v1/project/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<ProjectResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Project.Service.getProjectPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getProjectById( id: number, token: string | null): Observable<ProjectResponse> {
    const url = `${ this.baseUrl }/api/v1/project/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProjectResponse>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('Project.Service.getProjectById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  /*
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

  public getRelatedProjects(id: number, token: string | null): Observable<string[]> {
    const url = `${ this.baseUrl }/api/v1/cropType/${id}/relatedProjects`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<string[]>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public addCropType( cropType: CropTypeRequest, token: string | null ): Observable<CropType> {
    const url = `${ this.baseUrl }/api/v1/cropType`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<CropType>( url, cropType, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }
  */

}
