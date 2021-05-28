import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
@Output() navigationCommandCreated = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  pauseButtonPressed(){
    console.log("pause button pressed");
    this.navigationCommandCreated.emit("pause");
  }



}
