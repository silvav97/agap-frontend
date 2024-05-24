import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { Pagination } from "../../shared/interfaces";
import { CropReportResponse, ProjectReportResponse } from "../interfaces";



@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )

  constructor() {}

  public getCropReportList(projectId:number, token: string | null): Observable<CropReportResponse[]> {
    const url = `${ this.baseUrl }/api/v1/report/crop/byProjectId/${projectId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CropReportResponse[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getCropReportPaginated(projectId:number, page: number, pageSize: number, token: string | null): Observable<Pagination<CropReportResponse>> {
    let url = `${ this.baseUrl }/api/v1/report/crop/byProjectId/${projectId}/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<CropReportResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('CropReport.Service.getCropReportPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getCropReportById( id: number, token: string | null): Observable<CropReportResponse> {
    const url = `${ this.baseUrl }/api/v1/report/crop/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CropReportResponse>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('CropReport.Service.getCropReportById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }





  public getProjectReportList(token: string | null): Observable<ProjectReportResponse[]> {
    const url = `${ this.baseUrl }/api/v1/report/project`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProjectReportResponse[]>( url, {headers} ).pipe(

        catchError( err => throwError( () => err.error )),
    );
  }

  public getProjectReportPaginated(page: number, pageSize: number, token: string | null): Observable<Pagination<ProjectReportResponse>> {
    let url = `${ this.baseUrl }/api/v1/report/project/page?pageNumber=${page}&pageSize=${pageSize}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pagination<ProjectReportResponse>>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('ProjectReport.Service.getProjectReportPaginated', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

  public getProjectReportById( id: number, token: string | null): Observable<ProjectReportResponse> {
    const url = `${ this.baseUrl }/api/v1/report/project/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProjectReportResponse>( url, {headers} ).pipe(
      tap( (response) => {
        console.log('ProjectReport.Service.getProjectReportById', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }


  public generatePDF(id: number, token: string | null): Observable<Blob> {
    const url = `${this.baseUrl}/api/v1/report/pdf/generate/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      tap((response) => {
        console.log('ReportService.generatePDF', response);
      }),
      catchError(err => throwError(() => err.error))
    );
  }

}
