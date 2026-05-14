import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth';
import { ConfirmModal } from '../confirm-modal/confirm-modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ConfirmModal],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

showLogoutModal = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.showLogoutModal = false;
    this.router.navigate(['/login']);
  }
}
