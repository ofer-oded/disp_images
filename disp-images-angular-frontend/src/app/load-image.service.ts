import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { take } from 'rxjs/internal/operators/take';


@Injectable({
  providedIn: 'root'
})
export class LoadImageService {

  constructor() 
  {
    console.log("LoadImageService constructor");
   }

   load(imgSrc) {
    const img = new Image();
    img.src = imgSrc;

    return fromEvent(img, 'load').pipe(take(1))
  }

}
