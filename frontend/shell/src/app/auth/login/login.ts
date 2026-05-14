import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router) {}  

  onLogin() {

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({

      next: (response) => {

        console.log('TOKEN JWT:', response.token);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },

      error: (error) => {

        console.error(error);

        alert('Invalid credentials');
      }

    });

  }
}