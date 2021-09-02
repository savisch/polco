import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student2 } from '../model/student2';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'https://api.hatchways.io/assessment/students'
  mockUrl = 'http://localhost:3000/students'

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl)}

  getMockStudents(): Observable<any> {
    return this.http.get<any>(this.mockUrl)}

  getStudent(id: number): Observable<any> {
      return this.http.get<any>(this.mockUrl
        + '/' + id)}

  putTag(fullName: string, studentId: number, id:number, tags: string[]): Observable<any> {
    return this.http.put<any>(this.mockUrl + '/' + id, {fullName: fullName, studentId: studentId, tags: tags})}

  newPostTag(fullName: string, studentId: number, tags: string[]): Observable<any> {
    return this.http.post<any>(this.mockUrl, {fullName, studentId, tags})}
}
