import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
interface User {
  id: number;
  age: number;
  dob: string;
  email: string;
  salary: string;
  address: string;
  imageUrl: string;
  lastName: string;
  firstName: string;
  contactNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://retoolapi.dev/HYd96h/data';

  constructor(private http: HttpClient) {}

  getUsers(startIndex: number, itemsPerPage: number): Observable<any> {
    
    let params = new HttpParams();
    params = params.append('page', startIndex.toString());
    params = params.append('itemsPerPage', itemsPerPage.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }
     

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
    

    return this.http.get<User[]>(this.apiUrl);
  }
}