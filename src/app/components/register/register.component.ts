import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.register(this.nome, this.email, this.senha).subscribe(
      (response) => {
        if (response.status === 201) {
          this.successMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); // Redirecionar após 3 segundos
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = error.error.message || 'Erro ao cadastrar. Tente novamente.';
      }
    );
  }
}
