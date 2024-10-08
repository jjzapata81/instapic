import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../const/shared.modules';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {

  }

  onLogin() {

    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      Swal.fire({
        title: 'Ingreso',
        text: 'Debe diligenciar todos los campos',
        icon: 'error'
      });
      return;
    }
    let userName = this.loginForm.value.userName || '';
    let password = this.loginForm.value.password || '';

    this.userService.login(userName, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: error => {
        Swal.fire({
          title: 'Ingreso',
          text: error.error.message,
          icon: 'error'
        });
      }
    });
  }

}
