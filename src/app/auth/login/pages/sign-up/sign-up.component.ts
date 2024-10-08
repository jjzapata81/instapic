import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

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
    name: [''],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rePassword: ['']
  });

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {

  }

  onResgister() {
    if (!this.signUpForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error'
      })
      return;
    }
    let name = this.signUpForm.value.name || '';
    let username = this.signUpForm.value.username || '';
    let email = this.signUpForm.value.email || '';
    let password = this.signUpForm.value.password || '';
    let rePassword = this.signUpForm.value.rePassword || '';
    if (rePassword !== password) {
      Swal.fire({
        text: 'Las constraseñas no coinciden',
        icon: 'error'
      })
      return;
    }


    this.userService.register({ username, password, email, name }).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: error => Swal.fire({
        text: error.error.message,
        icon: 'error'
      })
    })
  }

}
