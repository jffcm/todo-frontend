import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:3000/api/v1/tarefas';

    constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

    private getHttpOptions() {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 401) {
            // Token inválido, redirecionar para a página de login
            this.authService.removeToken();
            this.router.navigate(['/login']);
        }
        return throwError(() => new Error(`An error occurred: ${error.message}`));
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl, this.getHttpOptions()).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    completeTask(taskId: number): Observable<any> {
        const url = `${this.apiUrl}/${taskId}/concluir`;
        return this.http.put(url, {}, this.getHttpOptions()).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    addTask(task: { descricao: string, prioridade: string }): Observable<any> {
        return this.http.post(this.apiUrl, task, this.getHttpOptions()).pipe(
            catchError(this.handleError.bind(this))
        );
    }
}
