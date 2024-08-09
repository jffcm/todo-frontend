import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container mt-5">
      <h1 class="mb-4 text-center">Bem vindo ao TO-DO</h1>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
