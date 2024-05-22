import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ProjectResponse } from "../interfaces/project-response.interface";
import { Pagination } from "../../shared/interfaces/pagination.interface";
import { ProjectRequest } from "../interfaces/project-request.interface";
import { CropResponse } from "../../crop/interfaces";


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
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // headers
    return this.http.get<Pagination<ProjectResponse>>( url, {} ).pipe(
      tap( (response) => {
        console.log('Project.Service.getProjectPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getProjectById( id: number, token: string | null): Observable<ProjectResponse> {
    const url = `${ this.baseUrl }/api/v1/project/${id}`;
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // headers
    return this.http.get<ProjectResponse>( url, {} ).pipe(
      tap( (response) => {
        console.log('Project.Service.getProjectById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public updateProject( projectRequest: ProjectRequest, token: string | null): Observable<ProjectResponse> {
    const url = `${ this.baseUrl }/api/v1/project/${projectRequest.id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<ProjectResponse>( url, projectRequest, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public deleteProjectById(id: number, token: string | null): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/project/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<boolean>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public addProject( ProjectRequest: ProjectRequest, token: string | null ): Observable<ProjectResponse> {
    const url = `${ this.baseUrl }/api/v1/project`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<ProjectResponse>( url, ProjectRequest, { headers } ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public getRelatedProjectApplications(id: number, token: string | null): Observable<string[]> {
    const url = `${ this.baseUrl }/api/v1/project/${id}/relatedProjectApplications`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<string[]>( url, {headers} ).pipe(
      catchError(err => throwError(() => err.error))
    );
  }

  public getCropListByProjectId(id: number, token: string | null): Observable<CropResponse[]> {
    const url = `${ this.baseUrl }/api/v1/project/${id}/relatedCrops`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CropResponse[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public uploadFile(formData: FormData, token: string | null): Observable<any> {
    const url = `${ this.baseUrl }/api/v1/project/upload`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>( url, formData, {headers} ).pipe(

      catchError( err => throwError( () => err.error )),
    );
  }

}
