import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../const/shared.modules';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm = this.fb.group({
    userName:['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    password:['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$')]]
  })

  constructor(private fb:FormBuilder, private router: Router){

  }

  onLogin(){

    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      alert('Debe diligenciar los campos');
      return;
    }
    let userName = this.loginForm.value.userName||'';
    let password = this.loginForm.value.password||'';

    const storedPassword = localStorage.getItem(userName.toLowerCase().trim());

    if (storedPassword === null || storedPassword !== password) {
      alert('Usuario o contraseña incorrectos');
      return;
    }
    this.router.navigateByUrl('/home');
  }

}
