import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import {ImageObject} from '../../src/backend-interface'
// import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GetNextImageNameService {
  constructor(private httpClient: HttpClient) {
    console.log('GetNextImageNameService constructor');
  }
  getNextImageName(url: string, pause: boolean) {
    if (!pause) {
      return this.httpClient.get<ImageObject>(url);
    }
    return EMPTY;
  }
}
