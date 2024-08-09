import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly apiUrl = environment.apiUrl;

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
            this.authService.removeToken();
            this.router.navigate(['/login']);
        }
        return throwError(() => new Error(`An error occurred: ${error.message}`));
    }

    getTasks(): Observable<Task[]> {
        const url = `${this.apiUrl}/tarefas`
        return this.http.get<Task[]>(url, this.getHttpOptions()).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    completeTask(taskId: number): Observable<any> {
        const url = `${this.apiUrl}/tarefas/${taskId}/concluir`;
        return this.http.put(url, {}, this.getHttpOptions()).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    addTask(task: { descricao: string, prioridade: string }): Observable<any> {
        const url = `${this.apiUrl}/tarefas`
        return this.http.post(url, task, this.getHttpOptions()).pipe(
            catchError(this.handleError.bind(this))
        );
    }
}
