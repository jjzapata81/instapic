import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../../auth/services/user.service';
import { GalleryItem } from '../../interfaces/gallery-item.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  followers = 5;
  requests = 150;
  galleryItems = signal<GalleryItem[]>([]);

  user;

  constructor(private userService: UserService){
    this.user = this.userService.getUser();
    this.userService.getGallery().subscribe(this.galleryItems.set);
  }


  onComment(comments: any[]) {
    let htmlContent = 'Aún no hay comentarios, se el primero!';
    if(comments.length>0){
      htmlContent = '<div>';
      comments.forEach(comment => {
        htmlContent += `<p>${comment.comment}</p>`;
      });
      htmlContent += '</div>';
    }
    Swal.fire({
      html: htmlContent
    })
  }

  onDelete(id: string) {
    Swal.fire({
      text: "¿Está seguro de eliminar la imagen seleccionada?",
      icon: "warning",
      iconColor: "#219ebc",
      showCancelButton: true,
      confirmButtonColor: "#023047",
      cancelButtonColor: "#d00000",
      confirmButtonText: "Si",
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(this.galleryItems.set);
      }
    });

  }

  onAddComment(event:Event, id:string){
    const input = event.target as HTMLInputElement;
    if(!input.value){
      return;
    }
    this.userService.addComment(id, input.value).subscribe(this.galleryItems.set);
    input.value = '';
  }

}
