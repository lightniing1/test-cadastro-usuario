import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.interface';
import { UserUpdate } from '../models/user-update.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/users';

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/me`);
  }

  updateProfile(userData: UserUpdate): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/me`, userData);
  }
}