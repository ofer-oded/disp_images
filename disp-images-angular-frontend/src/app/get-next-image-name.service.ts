import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import {ImageObject} from '../../src/backend-interface'

@Injectable({
  providedIn: 'root',
})
export class GetNextImageNameService {
  constructor(private httpClient: HttpClient) {
  }
  getNextImageName(url: string, pause: boolean) {
    if (!pause) {
      return this.httpClient.get<ImageObject>(url);
    }
    return EMPTY;
  }
}
