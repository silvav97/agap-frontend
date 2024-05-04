import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ProjectApplicationRequest, ProjectApplicationResponse } from "../interfaces";
import { Pagination } from "../../shared/interfaces/pagination.interface";



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

  public getProjectApplicationPaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<ProjectApplicationResponse>> {
    const url = `${ this.baseUrl }/api/v1/project-application/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<ProjectApplicationResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('ProjectApplication.Service.getProjectApplicationPaginated', response);
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

}
