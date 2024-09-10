import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSignal = signal<User | null>(null);

  get user() {
    return this.userSignal;
  }

  setUser(user: User) {
    this.userSignal.set(user);
  }

  clearUser() {
    this.userSignal.set(null);
  }

  login(userName: string, password: string) {
    const storedPassword = localStorage.getItem(userName.toLowerCase().trim());

    if (storedPassword === null || storedPassword !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    this.setUser({userName, password, login:true});
    return {
      success: true,
      message: 'Ingreso exitoso'
    }

  }

  register(user:User){
    if (localStorage.getItem(user.userName.toLowerCase().trim())) {
      return {
        success: false,
        message: 'Usuario ya existe'
      }
    }
    localStorage.setItem(user.userName.toLowerCase().trim(), user.password);
    this.setUser(user);
    return {
      success: true,
      message: 'Ingreso exitoso'
    }
  }
}
