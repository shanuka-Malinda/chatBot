import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgGenerationService {
  private apiUrl = 'https://picsum.photos/800/600'; // Lorem Picsum endpoint for a random 800x600 image

  constructor(private http: HttpClient) {}

  generateImage(params: any): Observable<Blob> {
    return this.http.post(this.apiUrl, params, { responseType: 'blob' });
  }
}
