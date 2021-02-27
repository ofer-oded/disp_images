import { Component , OnInit} from '@angular/core';
import {EMPTY, interval, Observable, Subject, of} from 'rxjs'
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
  backendURL =`http://${environment.baseUrl}:8000/disp_images/?command=GET_NEXT_IMAGE_NAME`;
  mediaURL = `http://${environment.baseUrl}:8000/media/`;
  image = undefined; 
  imgURLs$ = new Observable<string>();
  value = false;

  ngOnInit(){
    console.log("init")
    this._doGet();
    this.image = document.images[0];
    }


  title = 'disp-images-angular-frontend';
  imgSrc: string;
  _doGet(){
    // https://codeburst.io/heres-how-i-built-my-very-own-pausable-rxjs-operator-24550123e7a6
    // https://thinkrx.io/gist/dffd23fb4fe78cdbf539a6f0913742f4/
    const pause$ = of(false);
    const interval$ = interval(2500);
    // interval$.subscribe(v => console.log(v));
    const newSource$ =  pause$.pipe(switchMap(value => value ? EMPTY : interval$)); 
    newSource$.subscribe(v => console.log(v));
    const imgObjs$ = newSource$.pipe(concatMap(_=>this.getNextImageNameService.getNextImageName(this.backendURL)));
    this.imgURLs$ = imgObjs$.pipe(map(imgObj => `${this.mediaURL}${imgObj.image_name}`)).pipe(
      concatMap(imgURL => this.loadImageService.load(imgURL).pipe(delay(10000)).pipe(mapTo(imgURL)))
    )
    // const pause$ = new Subject();
    // const value = false;
    // pause$.pipe(switchMap(value => value ? EMPTY : imgURLs$));
    this.imgURLs$.subscribe(imgURL => this.imgSrc = imgURL);

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
