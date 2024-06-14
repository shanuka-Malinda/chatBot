import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  //imgMy




  private cloudName = 'dtaiwjicp';
  private uploadPreset = 'imgMy_data'; // Set up a preset in your Cloudinary dashboard

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  deleteImage(publicId: string): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/destroy`;
    return this.http.post(url, { public_id: publicId });
  }








}
