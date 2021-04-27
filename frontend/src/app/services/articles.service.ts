import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders ,HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {Article} from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient : HttpClient) { }
  fetchArticles(){
    // let url = 'http://localhost:3000/articles'
    let url = 'articles'
    return this.httpClient.get(url)
  }
  fetchArticlesById(id:String){
    // let url = 'http://localhost:3000/articles/'+id;
    let url = 'articles/'+id;
    return this.httpClient.get(url)
  }
  insertArticles(data:Article){
    // let url = 'http://localhost:3000/newArticle';
    let url = 'newArticle'
    return this.httpClient.post(url,data)
  }
  editArticles(id:String,data:Article){
    // let url = 'http://localhost:3000/articles/'+id;
    let url = 'articles/'+id
    return this.httpClient.put(url,data)
  }
  deleteArticles(id:String){
    // let url = 'http://localhost:3000/articles/'+id;
    let url = 'articles/'+id;
    return this.httpClient.delete(url)
  }
}
