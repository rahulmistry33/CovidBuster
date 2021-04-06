import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders ,HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidcasesService {

  constructor(private httpClient : HttpClient) { }
  getCount(){
    let url = 'https://api.covid19api.com/world/total';
    return this.httpClient.get(url)
  }

}
