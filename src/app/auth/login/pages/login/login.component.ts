import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../const/shared.modules';
import { UserService } from '../../../services/user.service';

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

  constructor(private fb:FormBuilder, private router: Router, private userService: UserService){

  }

  onLogin(){

    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      alert('Debe diligenciar los campos');
      return;
    }
    let userName = this.loginForm.value.userName||'';
    let password = this.loginForm.value.password||'';

    let response = this.userService.login(userName, password);
    alert(response.message);
    if(response.success){
      this.router.navigateByUrl('/home');
    }

  }

}
