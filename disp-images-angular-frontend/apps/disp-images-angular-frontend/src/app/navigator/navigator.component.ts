import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlaybackConstants } from '../playback-constants';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {
  @Output() navigationCommandCreated = new EventEmitter<PlaybackConstants>();
  playbackState: PlaybackConstants;
  pauseButtonCaption: string = '';
  disablePrevNextButtons: boolean = false;
  
  constructor() {}

  ngOnInit(): void {
    this.playbackState = PlaybackConstants.PLAY;
    this.pauseButtonCaption = 'pause';
    this.disablePrevNextButtons = true;
  }

  pauseButtonPressed() {
    if (this.playbackState === PlaybackConstants.PAUSE) {
      this.playbackState = PlaybackConstants.PLAY;
      this.pauseButtonCaption = 'pause';
      this.disablePrevNextButtons = true;
      this.navigationCommandCreated.emit(this.playbackState);
      return;
    }

    if (this.playbackState === PlaybackConstants.PLAY) {
      this.playbackState = PlaybackConstants.PAUSE;
      this.pauseButtonCaption = 'play';
      this.disablePrevNextButtons = false;
      this.navigationCommandCreated.emit(this.playbackState);
      return;
    }
  }

  prevButtonPressed() {
    this.navigationCommandCreated.emit(PlaybackConstants.PREV);
  }

  nextButtonPressed() {
    this.navigationCommandCreated.emit(PlaybackConstants.NEXT);
  }
}
