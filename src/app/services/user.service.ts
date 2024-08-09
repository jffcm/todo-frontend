import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/usuarios';

  constructor(private http: HttpClient) {}

  register(nome: string, email: string, senha: string): Observable<any> {
    const url = `${this.apiUrl}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, { nome, email, senha }, httpOptions);
  }
}
