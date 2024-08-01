import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Payload } from '../interfaces/payload.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;

  private _payload = signal<Payload|null>(null);
  private _authStatus = signal<AuthStatus|null>(AuthStatus.checking);

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  payload = computed(() => this._payload());
  authStatus = computed(() => this._authStatus());

  private http = inject(HttpClient);

  constructor(){
    if(this.isLocalStorageAvailable && localStorage.getItem('token')){
      const payload = this.decodeToken();
      this._payload.set(payload);
      this._authStatus.set(AuthStatus.authenticated);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };

    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, body)
      .pipe(
        map( ({token}) => {
          const helper = new JwtHelperService();
          let payload = helper.decodeToken<Payload>(token);
          payload!.isTokenExpired = false;
          this._payload.set(payload);
          console.log(helper.isTokenExpired())
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
          return true;
        }),
        catchError(err => {
          return throwError(() => err.error.message)
        })
      )
  }

  verifyTokenExpired(): boolean {
    if(this.payload()!.isTokenExpired){
      this._authStatus.set(AuthStatus.notAuthenticated);
      return true;
    }
    return false;
  }

  logout(): void {
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }

  private decodeToken(): Payload {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token')!;
    let payload = helper.decodeToken<Payload>(token);
    payload!.isTokenExpired = helper.isTokenExpired(token);
    return payload!;
  }

  get getToken(){
    return localStorage.getItem('token');
  }
}
