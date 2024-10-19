import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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

    const response = this.http.post<ApiResponse>(url, loginRequest);
    console.log(response);
    return response
  }

  public register(registerRequest: RegisterRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}register`;

    return this.http.post<ApiResponse>(url, registerRequest);
  }

  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}resetPassword`

    return this.http.post<ApiResponse>(url, resetPasswordRequest);
  }
}
