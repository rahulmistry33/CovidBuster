import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ArticlesService} from '../../services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private articlesService: ArticlesService,private router:Router) { }

  articleList : any;
  ngOnInit(): void {
    //HTTP always returns an observable, thats why use subscribe function 
    this.articlesService.fetchArticles().subscribe(data => 
      this.articleList = data
    );
  }

  deleteArticle(id:String){
    this.articlesService.deleteArticles(id).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/articles'])
    })
  }

}
