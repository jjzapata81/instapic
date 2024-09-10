import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    email: [''],
    userName:['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    password:['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$')]],
    rePassword: ['']
  });

  constructor(private fb: FormBuilder, private router: Router) {

  }

  onResgister() {
    if (!this.signUpForm.valid) {
      alert('Diligencie todos los campos');
      return;
    }
    let userName = this.signUpForm.value.userName || '';
    let password = this.signUpForm.value.password || '';
    let rePassword = this.signUpForm.value.rePassword || '';
    if (rePassword !== password) {
      alert('Las constraseñas no coinciden');
      return;
    }

    if (localStorage.getItem(userName.toLowerCase().trim())) {
      alert('Usuario ya existe');
      return;
    }

    localStorage.setItem(userName.toLowerCase().trim(), password);
    this.router.navigateByUrl('/home');
  }

}
