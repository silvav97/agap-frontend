import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, catchError, concatMap, tap, throwError } from "rxjs";
import { ProjectApplicationRequest, ProjectApplicationResponse } from "../interfaces";
import { Pagination } from "../../shared/interfaces/pagination.interface";
import { AuthService } from "../../auth/services/auth.service";



@Injectable({
  providedIn: 'root'
})
export class ProjectApplicationService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )

  constructor() {}

  public getProjectApplicationList(token: string | null): Observable<ProjectApplicationResponse[]> {
    const url = `${ this.baseUrl }/api/v1/project-application`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProjectApplicationResponse[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getProjectApplicationPaginated(page: number, pageSize: number, token: string | null, projectId?: number): Observable<Pagination<ProjectApplicationResponse>> {
    let url = `${ this.baseUrl }/api/v1/project-application/page?pageNumber=${page}&pageSize=${pageSize}`;
    if (projectId) url += `&projectId=${projectId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<ProjectApplicationResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('ProjectApplication.Service.getProjectApplicationPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getMyProjectApplicationPaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<ProjectApplicationResponse>> {
    const url = `${this.baseUrl}/api/v1/project-application/mine/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<ProjectApplicationResponse>>(url, { headers }).pipe(
      tap( (response) => {
        console.log('ProjectApplication.Service.getMyProjectApplicationPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getProjectApplicationById( id: number, token: string | null): Observable<ProjectApplicationResponse> {
    const url = `${ this.baseUrl }/api/v1/project-application/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProjectApplicationResponse>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('ProjectApplication.Service.getProjectApplicationById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public updateProjectApplication( projectApplicationRequest: ProjectApplicationRequest, token: string | null): Observable<ProjectApplicationResponse> {
    const url = `${ this.baseUrl }/api/v1/project-application/${projectApplicationRequest.id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<ProjectApplicationResponse>( url, projectApplicationRequest, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public deleteProjectApplicationById(id: number, token: string | null): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/project-application/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<boolean>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public addProjectApplication( projectApplicationRequest: ProjectApplicationRequest, token: string | null ): Observable<ProjectApplicationResponse> {
    const url = `${ this.baseUrl }/api/v1/project-application`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<ProjectApplicationResponse>( url, projectApplicationRequest, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public rejectProjectApplication(id: number, token: string | null ): Observable<any> {
    const url = `${ this.baseUrl }/api/v1/project-application/${id}/reject`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>( url, {}, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

}
