import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response.interface';
import { GalleryItem } from '../../features/home/interfaces/gallery-item.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){}


  userSignal = signal<User>({username:'', password:'', email:''});

  login(username: string, password: string) : Observable<LoginResponse>{
    const body = {
      username,
      password
    }
    return this.http.post<UserResponse>('http://localhost:3000/api/user/login', body).pipe(
      tap(response=>{
        this.setUser(response);
        sessionStorage.setItem('token', response.token);

      }),
      map(()=>{return {success:true}})
    );
  }

  logout(){
    localStorage.removeItem('loggedUser');
    sessionStorage.clear();
    this.userSignal.set({username:'', password:'', email:''});
  }

  saveImage(id:string, url:string, userName:string){
    const newImage:GalleryItem = {
      id,
      url,
      comments:[]
    }
    let galleryStr = localStorage.getItem(`imgs-${userName}`);
    if(galleryStr){
      let gallery = JSON.parse(galleryStr);
      gallery = [...gallery, newImage];
      localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
    }else{
      localStorage.setItem(`imgs-${userName}`,JSON.stringify([newImage]));
    }
  }

  getGallery(userName:string):GalleryItem[]{
    let galleryStr = localStorage.getItem(`imgs-${userName}`);
    if(galleryStr){
      return JSON.parse(galleryStr);
    }
    return [];
  }

  updateGallery(userName:string, gallery:GalleryItem[]){
    localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
  }

  register(user:User): Observable<SignUpResponse>{
    return this.http.post<UserResponse>('http://localhost:3000/api/user', user).pipe(
      tap(response=>{
        this.setUser(response);
        sessionStorage.setItem('token', response.token);

      }),
      map(()=>{return {success:true}})
    )
  }

  private setUser(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }

  getUser(){
    const userSrt = localStorage.getItem('loggedUser');
    if(userSrt){
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }

}
