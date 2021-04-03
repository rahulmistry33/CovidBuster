import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders ,HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DisplayNewsService {

  constructor(private httpClient : HttpClient) { }
  dislayNews(){
    let url = 'https://newsapi.org/v2/top-headlines?q=covid&apiKey=a8720d66af5749479e06c45ec5ff5a92'
    return this.httpClient.get(url)
  }
}
