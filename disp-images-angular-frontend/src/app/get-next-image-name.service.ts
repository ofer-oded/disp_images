import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetNextImageNameService {

  constructor(private httpClient:HttpClient) {
    console.log("GetNextImageNameService constructor")
   }
   getNextImageName(url:string):Observable<any>{
    return this.httpClient.get(url);
   }

}
