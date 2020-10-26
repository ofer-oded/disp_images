import { Component , OnInit} from '@angular/core';
import {interval} from 'rxjs'
import {map, switchMap, concatMap, mapTo, flatMap, take, delay} from 'rxjs/operators';

import {GetNextImageNameService} from './get-next-image-name.service'
import {LoadImageService} from './load-image.service';
import {environment} from "../environments/environment"



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private getNextImageNameService:GetNextImageNameService, private loadImageService: LoadImageService){
  }
  backendURL =`http://${environment.baseUrl}:8000/disp_images/?IMAGE_INDEX=-2`;
  mediaURL = `http://${environment.baseUrl}:8000/media/`;
  image = undefined; 

  ngOnInit(){
    console.log("init")
    this._doGet();
    this.image = document.images[0];
    }


  title = 'disp-images-angular-frontend';
  imgSrc: string;
  _doGet(){
    const interval$ = interval(2500);
    const imgObjs$ = interval$.pipe(concatMap(_=>this.getNextImageNameService.getNextImageName(this.backendURL)));
    const imgURLs$ = imgObjs$.pipe(map(imgObj => `${this.mediaURL}${imgObj.id}`)).pipe(
      concatMap(imgURL => this.loadImageService.load(imgURL).pipe(delay(10000)).pipe(mapTo(imgURL)))
    )
    imgURLs$.subscribe(imgURl => this.imgSrc = imgURl);
  }
  handleImageClickEvent(){
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
}
