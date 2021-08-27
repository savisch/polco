import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'https://api.hatchways.io/assessment/students'

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl)}
}
