import { Component, computed } from '@angular/core';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  posts = 10;
  followers = 5;
  requests = 250;
  user = computed(()=>this.userService.user());

  constructor(private userService: UserService){

  }

}
