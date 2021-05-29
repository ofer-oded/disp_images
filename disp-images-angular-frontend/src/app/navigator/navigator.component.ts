import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
@Output() navigationCommandCreated = new EventEmitter<string>();
playbackState:string = "";
pauseButtonCaption:string = "";
disablePrevNextButtons:boolean = false;
constructor() {
   }

  ngOnInit(): void {
  this.playbackState = "play";
  this.pauseButtonCaption = "pause";
  this.disablePrevNextButtons = true;  
  }

  pauseButtonPressed(){
    if(this.playbackState === "pause"){
      this.playbackState = "play";
      this.pauseButtonCaption = "pause";
      this.disablePrevNextButtons = true;
      this.navigationCommandCreated.emit(this.playbackState);
      return;
    }

    if(this.playbackState === "play"){
      this.playbackState = "pause";
      this.pauseButtonCaption = "play";
      this.disablePrevNextButtons = false;
      this.navigationCommandCreated.emit(this.playbackState);
      return;
    }  

  }



}
