import { Component } from '@angular/core';
import { CloudinaryService } from '../service/cloudinary.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  error: string | null = null;
  constructor(private cloudinaryService: CloudinaryService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
        response => {
          this.imageUrl = response.secure_url;
          
          this.error = null;
          // Send the URL to the backend
        },
        err => {
          this.error = err;
        }
      );
    }
  }


}
