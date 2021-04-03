import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root',
})
export class LoadImageService {
  constructor() {
  }

  load(imgURL: string) {
    const img = new Image();
    img.src = imgURL;
    // return an Observable of load even when the image was loaded
    return fromEvent(img, 'load').pipe(take(1));
  }
}
