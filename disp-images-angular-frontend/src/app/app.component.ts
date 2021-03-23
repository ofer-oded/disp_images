import { Component , OnInit} from '@angular/core';
import {EMPTY, interval, Observable, Subject, of} from 'rxjs'
import {map, switchMap, concatMap, mapTo, flatMap, take, delay} from 'rxjs/operators';

import {GetNextImageNameService} from './get-next-image-name.service'
import {LoadImageService} from './load-image.service';
import {environment} from "../environments/environment"
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private backendURL: string = `http://${environment.baseUrl}:8000/disp_images/?command=GET_NEXT_IMAGE_NAME`;
  private mediaURL: string = `http://${environment.baseUrl}:8000/media/`;
  private image: any = undefined;
  private pause: boolean = false; 
  
  constructor(private getNextImageNameService:GetNextImageNameService, private loadImageService: LoadImageService){
  }
  
  ngOnInit(){
    console.log("init")
    this._doGet();
    this.image = document.images[0];
  }
  
  
  title = 'disp-images-angular-frontend';
  imgSrc: string;
  _doGet(){
    const interval$ = interval(5000);
    const imgObjs$ = interval$.pipe(concatMap(_ => this.getNextImageNameService.getNextImageName(this.backendURL,this.pause)));
    const imgURLs$ = imgObjs$.pipe(
      map((imgObj) => {
      return `${this.mediaURL}${imgObj.image_name}`;
    })).pipe(
      concatMap(imgURL => this.loadImageService.load(imgURL).pipe(mapTo(imgURL)))
      )
      imgURLs$.subscribe(imgURL => this.imgSrc = imgURL);
    }
    handleImageDblClickEvent(){
      if(this.image.requestFullscreen){
        this.image.requestFullscreen();
      } else if(this.image.mozRequestFullScreen){ // Firefox
        this.image.mozRequestFullScreen();
      } else if(this.image.webkitRequestFullscreen){ // Chrome, Safari and Opera 
        this.image.webkitRequestFullscreen();
      } else if(this.image.msRequestFullscreen) { // IE/Edge
        this.image.msRequestFullscreen();
      }
    }
    
    handleImageClickEvent(){
      this.pause = !this.pause;
      console.log("pause");
    }

    
  }
  