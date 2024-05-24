import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environments';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, RefreshTokenResponse, RegisterResponse, User } from '../interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private router = inject( Router );
  private http = inject( HttpClient );

  private _currentUser = new BehaviorSubject<User|null>(null);
  private _authStatus = new BehaviorSubject<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = this._currentUser.asObservable();
  public authStatus = this._authStatus.asObservable();

  constructor() {
    this.checkAuthStatus().subscribe();
   }

  public login(email:string, password:string): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body ).pipe(
        map( ({user, access_token, refresh_token}) => this.setAuthentication(user, access_token, refresh_token)),
        catchError( err => throwError( () => err.error )),
    );
  }

  public resetPassword(newPassword:string, confirmationPassword:string, token: string): Observable<string> {
    const url = `${ this.baseUrl }/api/v1/user/reset-password`;
    const body = { newPassword, confirmationPassword };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<string>( url, body, {headers} ).pipe(

        tap( (response) => console.log('response dentro del auth',response)),
        catchError( (err) => {
          console.log('Error obtenido en authResetPassword: ', err);
          return throwError( () => new Error(err.error.message || "Unknown error") )
        }),
    );
  }


  public verifyAccount(token: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/auth/verify/${token}`;

    return this.http.get<LoginResponse>(url).pipe(
      map( ({user, access_token, refresh_token}) => {
        console.log('Verification Success:');
        return this.setAuthentication(user, access_token, refresh_token)
      }),
      catchError(err => {
        console.error('Verification Error:', err.error);
        return throwError(() => new Error('Verification failed'));
        // return of(false);
      })
    );
  }

  public register(firstname:string, lastname:string, email:string, password:string): Observable<RegisterResponse> {
    const url = `${ this.baseUrl }/api/v1/auth/register`;
    const body = { firstname, lastname, email, password };

    return this.http.post<RegisterResponse>( url, body ).pipe(
        //tap( (message: RegisterResponse) => message.message),
      //map( ({user, access_token, refresh_token}) => this.setAuthentication(user, access_token, refresh_token)),
        catchError( err => throwError( () => err.error )),
    );
  }

  public forgotPassword(email:string): Observable<any> {
    const url = `${ this.baseUrl }/api/v1/user/forgot-password`;
    const body = { email };

    return this.http.post<any>( url, body ).pipe(
      tap(response => console.log('Forgot Password Response:', response)),

      catchError( err => {
        console.error('ForgotPassword Error:', err.error);
        return throwError( () => err.error );
      }
      ),
    );
  }

  public checkAuthStatus(): Observable<boolean> {
    return new Observable(observer => {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      if ( !access_token || !refresh_token ) {
        this.logout();
        observer.next(false);
        observer.complete();
        return;
      }

      // Check if access token is expired
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      const now = new Date();

      if (expirationDate > now) {
        this._authStatus.next(AuthStatus.authenticated);
        this._currentUser.next(this.getCurrentUser(access_token));
        observer.next(true);
        observer.complete();
      } else {
        // Check if refresh token is expired
        const refreshPayload = JSON.parse(atob(refresh_token.split('.')[1]));
        const refreshExpirationDate = new Date(refreshPayload.exp * 1000);

        if (refreshExpirationDate <= now) {
          this.logout();
          observer.next(false);
          observer.complete();
        } else {
          this.refreshToken(refresh_token).subscribe({
            next: (result) => {
              observer.next(result);
              observer.complete();
            },
            error: () => {
              this.logout();
              observer.next(false);
              observer.complete();
            }
          });
        }
      }
    });
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._currentUser.next(null);
    this._authStatus.next( AuthStatus.notAuthenticated );
    //this.router.navigateByUrl('auth/login');
  }

  private refreshToken(refresh_token: string): Observable<boolean> {
    const url = `${ this.baseUrl }/api/v1/auth/refresh-token`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${refresh_token}`);

    return this.http.post<RefreshTokenResponse>(url, {}, { headers }).pipe(
      map(({user, access_token, refresh_token}) => this.setAuthentication(user, access_token, refresh_token)),
      catchError(() => {
          this.logout();
          return of(false);
      }),
    );
  }

  private setAuthentication(user: User, access_token:string, refresh_token:string): boolean {
    this._currentUser.next( this.getCurrentUser(access_token) );
    this._authStatus.next( AuthStatus.authenticated );
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return true;
  }

  private getCurrentUser(access_token: any): User | null {
    const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
    const id    = tokenPayload.id;
    const name  = tokenPayload.name;
    const roles = tokenPayload.roles;
    const email = tokenPayload.sub;

    var user : User = {id: id, email: email, name: name, isActive: true, roles: roles};
    return user;
  }

  public getUserRoles(): Observable<string[]> {
    return this.currentUser.pipe(
      map(user => user? user.roles : [])
    )
  }

}
