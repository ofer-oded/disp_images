import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { concatMap, map, mapTo, switchMap } from 'rxjs/operators';
import { environment } from "../environments/environment";
import { GetNextImageNameService } from './get-next-image-name.service';
import { LoadImageService } from './load-image.service';
import {ImageObject} from '../../src/backend-interface'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private backendURL: string = `http://${environment.baseUrl}:8000/disp_images/?command=GET_NEXT_IMAGE_NAME`;
  private mediaURL: string = `http://${environment.baseUrl}:8000/media/`;
  private image: HTMLImageElement = undefined;
  private pause: boolean = false; 
  
  constructor(private getNextImageNameService:GetNextImageNameService, private loadImageService: LoadImageService){
  }
  
  ngOnInit(){
    this._doGet();
    this.image = document.images[0];
  }
  
  
  title = 'disp-images-angular-frontend';
  imgSrc: string;
  _doGet(){
    const interval$ = interval(5000);
    const imgObjs$:Observable<ImageObject> = interval$.pipe(concatMap(_ => this.getNextImageNameService.getNextImageName(this.backendURL,this.pause)));
    const imgURLs$:Observable<string> = imgObjs$.pipe(
      map((imgObj) => {
        return `${this.mediaURL}${imgObj.image_name}`;
    })).pipe(
      concatMap(imgURL => this.loadImageService.load(imgURL).pipe(mapTo(imgURL)))
      )
      imgURLs$.subscribe(imgURL => this.imgSrc = imgURL);
    }
    
    fullScreen(){
      console.log("full screen");
      if(this.image.requestFullscreen){
        this.image.requestFullscreen();
      }/* else if(this.image.mozRequestFullScreen){ // Firefox
        this.image.mozRequestFullScreen();
      } else if(this.image.webkitRequestFullscreen){ // Chrome, Safari and Opera 
        this.image.webkitRequestFullscreen();
      } else if(this.image.msRequestFullscreen) { // IE/Edge
        this.image.msRequestFullscreen();
      }*/
    }
    
    handleImageClickEvent(event: MouseEvent){
      if(event.shiftKey){
        this.fullScreen();
        return;
      }
      this.pause = !this.pause;
      if(document.fullscreenElement){
      document.exitFullscreen();
      }

    }

    public hide_pause_indicator() : boolean{
      return !this.pause;
    }

  }
  