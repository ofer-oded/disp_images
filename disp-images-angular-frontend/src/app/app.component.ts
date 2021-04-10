import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { concatMap, map} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { GetNextImageNameService } from './get-next-image-name.service';
import { LoadImageService } from './load-image.service';
import { ImageObject } from '../../src/backend-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private backendURL: string = `http://${environment.baseUrl}:8000/disp_images/?command=GET_NEXT_IMAGE_NAME`;
  private mediaURL: string = `http://${environment.baseUrl}:8000/media/`;
  private image: HTMLImageElement = undefined;
  private pause: boolean = false;
  public image_count: string = "1/1";
  public year_event: string = "";

  constructor(
    private getNextImageNameService: GetNextImageNameService,
    private loadImageService: LoadImageService
  ) {}

  ngOnInit() {
    this._doGet();
    this.image = document.images[0];
  }

  title = 'disp-images-angular-frontend';
  imgSrc: string;
  _doGet() {
    const interval$ = interval(5000);
    const imgObjs$: Observable<ImageObject> = interval$.pipe(
      concatMap((_) =>
        this.getNextImageNameService.getNextImageName(
          this.backendURL,
          this.pause
        )
      )
    );
    // imgObjs: a stream of ImageObject's every interval

    const imageObjectsFullURL$: Observable<ImageObject> = imgObjs$.pipe(
      map((imgObject: ImageObject) => {
        imgObject.image_name = `${this.mediaURL}${imgObject.image_name}`;
        return imgObject;
      })
    );
    // imageObjectsFullURL$ : a stream of ImageObject's where each imgObject.image_name contains the full image URL

    // load URL: imageObjectsFullURL.image_name. using  concatMap so every load is done only after the previous finished
    imageObjectsFullURL$.pipe(
      concatMap((imageObjectsFullURL: ImageObject) =>
        this.loadImageService.load(imageObjectsFullURL.image_name)
      )
    );

    // display the image
    // this.imgSrc is input binding to the html img tag
    imageObjectsFullURL$.subscribe((imageObjectsFullURL: ImageObject) => {
      this.imgSrc = imageObjectsFullURL.image_name;
      this.image_count = this.createImageCountString(imageObjectsFullURL.image_index,imageObjectsFullURL.total_number_of_images);
      this.year_event = `${imageObjectsFullURL.year} ${imageObjectsFullURL.event}` 
    });

  }

  fullScreen() {
    console.log('full screen');
    if (this.image.requestFullscreen) {
      this.image.requestFullscreen();
    } /* else if(this.image.mozRequestFullScreen){ // Firefox
        this.image.mozRequestFullScreen();
      } else if(this.image.webkitRequestFullscreen){ // Chrome, Safari and Opera 
        this.image.webkitRequestFullscreen();
      } else if(this.image.msRequestFullscreen) { // IE/Edge
        this.image.msRequestFullscreen();
      }*/
  }

  handleImageClickEvent(event: MouseEvent) {
    if (event.shiftKey) {
      this.fullScreen();
      return;
    }
    this.pause = !this.pause;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  private createImageCountString(image_index: number, total_images: number): string{
    return `${image_index+1}/${total_images}`
  }

  public hide_pause_indicator(): boolean {
    return !this.pause;
  }
}
