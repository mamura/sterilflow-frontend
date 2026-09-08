import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { CurrentUser, LoginRequest, LoginResponse, UserRole } from "../models/auth.models";
import { switchMap, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http         = inject(HttpClient);
  private readonly apiUrl       = 'http://localhost:8080/api/auth';
  private readonly accessToken  = signal<string | null>(null);
  private readonly user         = signal<CurrentUser | null>(null);

  readonly currentUser      = this.user.asReadonly();
  readonly isAuthenticated  = computed(() => this.user() !== null);

  login(credentials: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => this.accessToken.set(response.accessToken)),
        switchMap(() => this.loadCurrentUser()),
      );
  }

  loadCurrentUser() {
    return this.http
      .get<CurrentUser>(`${this.apiUrl}/me`)
      .pipe(tap((user) => this.user.set(user)));
  }

  refreshSession() {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/refresh`, null, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => this.accessToken.set(response.accessToken)),
        switchMap(() => this.loadCurrentUser()),
      )
  }

  logout() {
    this.accessToken.set(null);
    this.user.set(null);

    return this.http.post(`${this.apiUrl}/logout`, null, {
      withCredentials: true,
    });
  }

  getAccessToken() {
    return this.accessToken();
  }

  hasRole(role: UserRole) {
    return this.user()?.roles.includes(role) ?? false;
  }

  homePathForCurrentUser() {
    if (this.hasRole('OPERATOR')) {
      return '/operator';
    }

    if (this.hasRole('CLIENT')) {
      return '/client';
    }

    return '/login';
  }
}
