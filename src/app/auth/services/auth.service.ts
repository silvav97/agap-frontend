import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, RefreshTokenResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

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

  public checkAuthStatus(): Observable<boolean> {

    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if ( !access_token || !refresh_token ) {
      this.logout();
      return of(false);
    }
    // Check if access token is expired
    const payload = JSON.parse(atob(access_token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    const now = new Date();

    if (expirationDate > now) {
      //this._currentUser.set( user );
      this._authStatus.set( AuthStatus.authenticated );
      return of(true);
    }

    else {
      // Check if refresh token is expired
      const refreshPayload = JSON.parse(atob(refresh_token.split('.')[1]));
      const refreshExpirationDate = new Date(refreshPayload.exp * 1000);

      if (refreshExpirationDate <= now) {
        this.logout();
        return of(false);
      } else {
        return this.refreshToken(refresh_token);
      }
    }
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._currentUser.set(null);
    console.log('Se seteo en null el user');
    this._authStatus.set( AuthStatus.notAuthenticated );
  }

  private setAuthentication(user: User, access_token:string, refresh_token:string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return true;
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

}
