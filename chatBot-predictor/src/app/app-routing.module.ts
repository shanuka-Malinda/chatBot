import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { ChartComponent } from './chart/chart.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { EditImgComponent } from './edit-img/edit-img.component';
import { FeedDataComponent } from './feed-data/feed-data.component';
import { GenImgComponent } from './gen-img/gen-img.component';
import { LinearRegressionComponent } from './linear-regression/linear-regression.component';
import { CloudinaryService } from './service/cloudinary.service';
import { UploadImageComponent } from './upload-image/upload-image.component';

const routes: Routes = [
  {path:"",component:FeedDataComponent},
  {path:"reg",component:LinearRegressionComponent},
   {path:"chat",component:ChatBotComponent},
   {path:"chart",component:ChartComponent},
   {path:"upImg",component:UploadImageComponent},
   {path:"canvas",component:CanvasComponent},
   {path:"eImg",component:EditImgComponent},
   {path:"genImg",component:GenImgComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private cloudinaryService: CloudinaryService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe(response => {
        this.imageUrl = response.secure_url;
        // Send the URL to the backend
      });
    }
  }
}
