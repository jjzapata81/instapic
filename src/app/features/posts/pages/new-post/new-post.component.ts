import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  user;
  uploadedUrl='';

  constructor(private postsService:PostsService, private userService:UserService){
    this.user = userService.getUser();

  }

  onFileSelected(event:Event){
    let inputFile = event.target as HTMLInputElement;
    if(!inputFile.files || inputFile.files.length <= 0){
      return;
    }
    const file:File = inputFile.files[0];
    const fileName = uuidv4();
    this.postsService.upload(file, fileName, this.user().userName)

  }

  // onFileSelected(event:Event){
  //   console.log(event);
  //   Swal.fire({
  //     title: 'Cargando...',
  //     text: 'Por favor espera',
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     }
  //   });
  //   let inputFile = event.target as HTMLInputElement;
  //   if(!inputFile.files || inputFile.files.length <= 0){
  //     return;
  //   }
  //   const file:File = inputFile.files[0];
  //   const fileName = uuidv4();
  //   this.postsService.upload(file, fileName, this.user().userName).then(data=>{
  //     this.uploadedUrl = data!;
  //     Swal.close();
  //     inputFile.value = '';
  //   }).catch(()=>{
  //     Swal.close();
  //       Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
  //   });
  // }

}
