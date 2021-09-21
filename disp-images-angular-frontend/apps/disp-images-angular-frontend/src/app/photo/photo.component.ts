import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
  @Input('imagesFullUrl$') imagesFullUrl$: Observable<string>;
  constructor() {}

  ngOnInit(): void {}
}
