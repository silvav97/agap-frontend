import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environments';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, RefreshTokenResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
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

  public checkAuthStatus(): Observable<boolean> {
    return new Observable(observer => {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      if ( !access_token || !refresh_token ) {
        //this._authStatus.set(AuthStatus.notAuthenticated);
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
        this._currentUser.next(this.getCurrentUser(payload));
        observer.next(true);
        observer.complete();
        //this._authStatus.set( AuthStatus.authenticated );
      } else {
        // Check if refresh token is expired
        const refreshPayload = JSON.parse(atob(refresh_token.split('.')[1]));
        const refreshExpirationDate = new Date(refreshPayload.exp * 1000);

        if (refreshExpirationDate <= now) {
          //this._authStatus.set(AuthStatus.notAuthenticated);
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

  private getCurrentUser(tokenPayload: any): User | null {
    const id    = tokenPayload.id;
    const name  = tokenPayload.name;
    const roles = tokenPayload.roles;
    const email = tokenPayload.sub;

    var user : User = {id: id, email: email, name: name, isActive: true, roles: roles};
    return user;
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._currentUser.next(null);
    console.log('Se seteo en null el user');
    this._authStatus.next( AuthStatus.notAuthenticated );
  }

  private setAuthentication(user: User, access_token:string, refresh_token:string): boolean {
    this._currentUser.next( user );
    this._authStatus.next( AuthStatus.authenticated );
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
