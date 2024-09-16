import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login(userName: string, password: string) :LoginResponse{
    const storedPassword = localStorage.getItem(userName.toLowerCase().trim());

    if (storedPassword !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    return {
      success: true
    }

  }

  register(user:User): SignUpResponse{
    if (localStorage.getItem(user.userName.toLowerCase().trim())) {
      return {
        success: false,
        message: 'Usuario ya existe'
      }
    }
    localStorage.setItem(user.userName.toLowerCase().trim(), user.password);
    return {
      success: true
    }
  }
}
