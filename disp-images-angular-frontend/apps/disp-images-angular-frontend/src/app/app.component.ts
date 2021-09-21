import { Component, EventEmitter } from '@angular/core';
import { interval, Observable, Subscription, of, Subject, NEVER } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { GetNextImageNameService } from './get-next-image-name.service';
import { ImageObject } from '../../src/backend-interface';
import { PlaybackConstants } from './playback-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private endPoint: string = `http://${environment.baseUrl}:8000/view_photos/get_image_details/`;
  // control playbackCommans#
  private playbackController: Subject<PlaybackConstants> = new Subject();
  // stream of playbackCommands (play, next, prev)
  private playbackCommands$: Observable<PlaybackConstants> =
    this.playbackController.asObservable();
  // stream of url request to get next, prev image details
  private urlRquestsToBackend$: Observable<string> = new Observable<string>();
  // reference to the image displayed
  private image: HTMLImageElement = undefined;
  // bollean to control platback stream
  private pause: boolean = false;
  public image_count: string = '1/1';
  public year_event: string = '';
  private _subscription: Subscription;
  // connects to service ImageObject stream
  public imageObjects$: Observable<ImageObject> = this.getNextImageNameService
    .imageObjects()
    .pipe(
      catchError((error) => {
        console.error('error loading image', error);
        // keep stream alive in case of error
        return new Observable<ImageObject>();
      })
    );
  public imageUrls$: Observable<string> = this.imageObjects$.pipe(
    // tap(console.log),
    map((imgObj) => (imgObj !== undefined ? imgObj.image_path : null))
  );
  public year_event$: Observable<string> = this.imageObjects$.pipe(
    map((imgObj) =>
      imgObj !== undefined ? `${imgObj.image_event}_${imgObj.image_year}` : null
    )
  );
  public image_count$: Observable<string> = this.imageObjects$.pipe(
    map((imgObj) => `${imgObj.image_index}/${imgObj.total_number_of_images}`)
  );

  constructor(private getNextImageNameService: GetNextImageNameService) {}

  ngOnInit() {
    // start the photos stream
    this._doGet();
    this.image = document.images[0];
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.playbackController.next(PlaybackConstants.PLAY);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  imagesFullUrl$: Observable<string>;
  private _doGet() {
    // get stream of playback commands
    this.playbackCommands$ = this.getPlaybackCommands(this.playbackCommands$);
    // convert stream of playback command to strearm of backend url requests
    this.urlRquestsToBackend$ = this.getURlRequests(this.playbackCommands$);
    this._subscription = this.urlRquestsToBackend$.subscribe({
      // request service to stream next image details
      next: (url) => this.getNextImageNameService.streamPhotos(url),
      error: (err) => console.error(err),
    });
  }

  private fullScreen() {
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

  public hide_pause_indicator(): boolean {
    return !this.pause;
  }

  private getURlRequests(
    playbackCommands$: Observable<PlaybackConstants>
  ): Observable<string> {
    return playbackCommands$.pipe(
      map((playBackCommand) => this.buildURL(this.endPoint, playBackCommand))
    );
  }

  private getPlaybackCommands(
    playbackCommands$: Observable<PlaybackConstants>
  ): Observable<PlaybackConstants> {
    // input: playbackCommand $(play, pause, next ...)
    // output: a stream of playback command or NEVER according to input
    return playbackCommands$.pipe(
      switchMap((playBackCommand: PlaybackConstants) => {
        if (playBackCommand === PlaybackConstants.PAUSE) return NEVER;
        else if (playBackCommand === PlaybackConstants.NEXT)
          return of(PlaybackConstants.NEXT);
        else if (playBackCommand === PlaybackConstants.PREV)
          return of(PlaybackConstants.PREV);
        else if (playBackCommand === PlaybackConstants.PLAY)
          return interval(5000).pipe(map((_) => PlaybackConstants.NEXT));
        else return interval(5000).pipe(map((_) => PlaybackConstants.NEXT));
      })
    );
  }

  public navigate(navigateCommand: EventEmitter<PlaybackConstants>) {
    // notify observable on a new platback command issued
    this.playbackController.next(navigateCommand);
  }

  private buildURL(endPoint: String, param: PlaybackConstants) {
    // return backend url according to the playback command
    if (param === PlaybackConstants.NEXT) {
      let command = '?command=get_next_image_details';
      let url = `${endPoint}${command}`;
      return url;
    }
    if (param === PlaybackConstants.PREV) {
      let command: string = '?command=get_prev_image_details';
      let url = `${endPoint}${command}`;
      return url;
    }
    console.log(`unsupported parameter: ${param}`);
  }
}
