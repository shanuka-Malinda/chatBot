import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ChartComponent } from './chart/chart.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { EditImgComponent } from './edit-img/edit-img.component';
import { FeedDataComponent } from './feed-data/feed-data.component';
import { GenImgComponent } from './gen-img/gen-img.component';
import { LinearRegressionComponent } from './linear-regression/linear-regression.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
@NgModule({
  declarations: [
    AppComponent,
    FeedDataComponent,
    ChatBotComponent,
    LinearRegressionComponent,
    ChartComponent,
    UploadImageComponent,
    CanvasComponent,
    EditImgComponent,
    GenImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
