import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/operators';
import { ImageObject } from '../../src/backend-interface';

@Injectable({
  providedIn: 'root',
})
export class LoadImageService {
  constructor() {}

  load(imgObj: ImageObject): Observable<ImageObject> {
    const img = new Image();
    img.src = imgObj.image_path;
    // return an Observable of load event when the image was loaded
    return fromEvent(img, 'load')
      .pipe(take(1))
      .pipe(map((e) => imgObj));
  }
}
