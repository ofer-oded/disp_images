import { ComponentFactory, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  empty,
  EMPTY,
  never,
  NEVER,
  Observable,
  of,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { environment } from '../environments/environment';
import { map, concatMap, switchMap, catchError } from 'rxjs/operators';
import { ImageObject } from '../../src/backend-interface';
import { LoadImageService } from './load-image.service';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetNextImageNameService {
  private mediaURL: string = `http://${environment.baseUrl}:8000/media/`;
  private _imageObjects$ = new Subject<ImageObject>();
  private _subscription: Subscription;
  private _pauseStream: boolean = false;

  // observers should subscribe to this observable in order to get an ImageObject that already loaded
  public imageObjects(): Observable<ImageObject> {
    return this._imageObjects$ as Observable<ImageObject>;
  }

  constructor(
    private httpClient: HttpClient,
    private loadImageService: LoadImageService
  ) {}

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public streamPhotos(url: string) {
    this.httpClient
      .get<ImageObject>(url)
      .pipe(
        // convert image path to full url
        map((imgObj: ImageObject) => ({
          ...imgObj,
          image_path: `${this.mediaURL}${imgObj.image_path}`,
        })),
        // load image
        concatMap((imgObjFullUrl: ImageObject) =>
          this.loadImageService.load(imgObjFullUrl)
        ),
        // Retries the caught source Observable again in case of error, similar to retry() operator
        // this will keep the stream alive in case of error
        catchError((err, caught) => caught)

        // notify that image loaded
      )
      .subscribe({
        next: (imgObj: ImageObject) => this._imageObjects$.next(imgObj),
        error: (err) => this._imageObjects$.error(err),
      });
  }

  private convertRelativeURLToAbsURL(
    imageObjects$: Observable<ImageObject>
  ): Observable<ImageObject> {
    // this will convert the relative url of ImageObject.image_path to absolute url so it can be loaded later
    return imageObjects$.pipe(
      map((imgObject: ImageObject) => {
        imgObject.image_path = `${this.mediaURL}${imgObject.image_path}`;
        return imgObject;
      })
    );
  }
}
