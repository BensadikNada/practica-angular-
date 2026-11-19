import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import {
  LucideLayoutDashboard,
  LucideFolder,
  LucideUsers,
  LucideClipboardList,
  LucideLogOut,
  LucideMenu,
} from '@lucide/angular';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideLayoutDashboard,
    LucideFolder,
    LucideUsers,
    LucideClipboardList,
    LucideLogOut,
    LucideMenu,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  sidebarVisible = false;
  esAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.esAdmin = this.authService.isAdmin();
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
