import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { LoginRequest } from '../models/login-request';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      data
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {

      const decodedToken: any = jwtDecode(token);

      const currentTime =
        Math.floor(Date.now() / 1000);

      return decodedToken.exp > currentTime;

    } catch (error) {

      return false;
    }
  }
}