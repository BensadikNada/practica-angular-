import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { EmpleadoService } from './empleado';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [];
  private nextId: number = 1;

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  constructor(private empleadoService: EmpleadoService) {
    const storedUsers = localStorage.getItem('users');

    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [
        {
          id: 1,
          username: 'admin',
          password: 'admin123',
          userType: 'admin',
        },
      ];

      this.saveUsers();
    }

    this.nextId = this.users.length > 0 ? Math.max(...this.users.map((user) => user.id)) + 1 : 1;
  }

  // login method
  login(username: string, password: string): boolean {
    const user = this.users.find((u) => u.username === username && u.password === password);
    if (user) {
      // do not store the password in session storage
      const { password, ...userWithoutPassword } = user;

      sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  }

  // logout method
  logout(): void {
    sessionStorage.removeItem('currentUser');
  }

  //  get the currently logged in user
  getCurrentUser(): Omit<User, 'password'> | null {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // check whether the user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  //check whether the user is admin
  isAdmin(): boolean {
    return this.getCurrentUser()?.userType === 'admin';
  }

  addEmployeeUser(username: string, password: string, empleadoId: number): boolean {
    if (!this.isAdmin()) {
      return false;
    }

    const usernameExists = this.users.some((user) => user.username === username);

    if (usernameExists) {
      return false;
    }

    const newUser: User = {
      id: this.nextId++,
      username,
      password,
      userType: 'empleado',
      empleadoId: empleadoId,
    };

    this.users.push(newUser);
    this.saveUsers();
    return true;
  }
}
