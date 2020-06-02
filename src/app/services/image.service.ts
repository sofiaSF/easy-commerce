import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageBlobUrl: string;

  constructor() { }

  
  getThumbnail(blobObs: Observable<any>) : void {
    blobObs
      .subscribe(
        (val) => { 
          this.createImageFromBlob(val);
        },
        response => {
          console.log("POST in error", response);
        },
        () => {
          console.log("POST observable is now completed.");
        });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = <string>reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
