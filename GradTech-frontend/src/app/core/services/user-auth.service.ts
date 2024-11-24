import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";

import {environment} from "@environments/environment";
import {ApiResponse, LoginRequest, RegisterRequest, ResetPasswordRequest} from "@models/auth-interfaces";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  private http = inject(HttpClient);
  private readonly API_URL: URL = new URL(environment.apiUrl);

  public login(loginRequest: LoginRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}login`;

    return this.http.post<ApiResponse>(url +'?useSessionCookies=true' , loginRequest, {
      withCredentials: true,
    });
  }

  public register(registerRequest: RegisterRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}register`;

    return this.http.post<ApiResponse>(url, registerRequest);
  }

  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}resetPassword`

    return this.http.post<ApiResponse>(url, resetPasswordRequest);
  }

  public logout(): Observable<ApiResponse> {
    const url = `${this.API_URL}logout`;

    return this.http.post<ApiResponse>(url, {},{ withCredentials: true });
  }

  public isAuthenticated(): Observable<boolean> {
    const url = `${this.API_URL}check-auth`;

    return this.http.get<any>(url, { withCredentials: true }).pipe(
      map((response) => response.isAuthenticated),
      catchError(() => {
        return [false];
      })
    );
  }

  public getUserRoles(): Observable<string[]> {
    const url = `${this.API_URL}roles`;

    return this.http.get<string[]>(url, { withCredentials: true });
  }
}
