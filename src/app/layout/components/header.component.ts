import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private userService = inject(UserService);
  private router = inject(Router);

  user = computed(()=>this.userService.user());

  logout(){
    this.userService.clearUser();
    this.router.navigateByUrl('');
  }

}
