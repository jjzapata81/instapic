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

  saveImage(id:string, url:string, username:string){
    const token = sessionStorage.getItem('token') || '';
    const headers:HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const newImage:GalleryItem = {
      id,
      url,
      comments:[]
    }
    this.http.post('http://localhost:3000/api/posts', newImage, {headers}).pipe(
      tap(response=>console.log(response))
    ).subscribe(response=>console.log(response));

    let galleryStr = localStorage.getItem(`imgs-${username}`);
    if(galleryStr){
      let gallery = JSON.parse(galleryStr);
      gallery = [...gallery, newImage];
      localStorage.setItem(`imgs-${username}`, JSON.stringify(gallery));
    }else{
      localStorage.setItem(`imgs-${username}`,JSON.stringify([newImage]));
    }
  }

  getGallery():Observable<GalleryItem[]>{
    const token = sessionStorage.getItem('token') || '';
    const headers:HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<GalleryItem[]>('http://localhost:3000/api/posts/user/id', {headers});
  }

  addComment(postId:string, comment:string):Observable<GalleryItem[]>{
    const token = sessionStorage.getItem('token') || '';
    const headers:HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const body = {
      postId, comment
    }
    return this.http.post<GalleryItem[]>('http://localhost:3000/api/posts/add/comment', body, {headers});
  }

  delete(postId:string):Observable<GalleryItem[]>{
    const token = sessionStorage.getItem('token') || '';
    const headers:HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<GalleryItem[]>(`http://localhost:3000/api/posts/${postId}`, {headers});
  }

  updateGallery(username:string, gallery:GalleryItem[]){
    localStorage.setItem(`imgs-${username}`, JSON.stringify(gallery));
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
