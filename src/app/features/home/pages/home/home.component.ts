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
  galleryItems = signal([
    {
      id: 1,
      url: '/assets/gallery0.jpg',
      comments: ['Hola', 'Bien']
    },
    {
      id: 2,
      url: '/assets/gallery1.jpg',
      comments: ['Hola', 'Bien']
    },
    {
      id: 3,
      url: '/assets/gallery2.webp',
      comments: []
    },
    {
      id: 4,
      url: '/assets/gallery3.jpeg',
      comments: []
    },
    {
      id: 5,
      url: '/assets/gallery4.jpg',
      comments: []
    },
    {
      id: 6,
      url: '/assets/gallery5.jpg',
      comments: []
    },
    {
      id: 7,
      url: '/assets/gallery6.jpg',
      comments: []
    },
    {
      id: 8,
      url: '/assets/gallery7.jpg',
      comments: ['Hola', 'Bien']
    },
    {
      id: 9,
      url: '/assets/gallery8.webp',
      comments: []
    },
    {
      id: 10,
      url: '/assets/gallery9.avif',
      comments: []
    }
  ]);

  user;

  constructor(private userService: UserService){
    this.user = this.userService.getUser();
  }


  onComment(comments: string[]) {

    let htmlContent = 'Aún no hay comentarios, se el primero!';
    if(comments.length>0){
      htmlContent = '<div>';
      comments.forEach(comment => {
        htmlContent += `<p>${comment}</p>`;
      });
      htmlContent += '</div>';
    }
    Swal.fire({
      html: htmlContent
    })
  }

  onDelete(id: number) {
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
        this.galleryItems.update(items =>
          items.filter(item => item.id !== id)
        );
      }
    });

  }

  onAddComment(event:Event, id:number){
    const input = event.target as HTMLInputElement;
    if(!input.value){
      return;
    }
    this.galleryItems.update(items=> {
      let selected = items.find(item=>item.id===id);
      if(selected){
        selected.comments = [...selected.comments, input.value]
      }
      return items;
    })
    input.value = '';
  }

}
