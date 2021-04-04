import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute,Params } from '@angular/router';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.css']
})
export class DisplayArticleComponent implements OnInit {

  constructor(private articlesService: ArticlesService,private route:ActivatedRoute) { }

  article : any;
  id:String;
  ngOnInit(): void {
    //HTTP always returns an observable, thats why use subscribe function 
    this.route.params.subscribe((params:Params) => {
        this.id = params['id']
    });
    this.articlesService.fetchArticlesById(this.id).subscribe(data => 
      this.article = data
    );

  }


}
