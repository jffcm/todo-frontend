import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.senha).subscribe(
      (response) => {
        if (response.status === 200) {
          this.authService.setToken(response.data.token);
          this.router.navigate(['/tasks']);
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      (error) => {
        this.errorMessage = `Login failed: ${error.error.message}`;
      }
    );
  }
}
