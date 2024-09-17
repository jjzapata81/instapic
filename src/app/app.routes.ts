import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/pages/login/login.component';
import { SignUpComponent } from './auth/login/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { NewPostComponent } from './features/posts/pages/new-post/new-post.component';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';
import { SearchComponent } from './features/search/pages/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component:HomeComponent},
  { path: 'new-post', component:NewPostComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'search', component:SearchComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
