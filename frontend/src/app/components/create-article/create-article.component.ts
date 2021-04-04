import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(public articlesService: ArticlesService,private router:Router) { }

  article = new Article("","");
  ngOnInit(): void {
    
    
  }
  onSubmit(form :NgForm){
    this.articlesService.insertArticles(this.article).subscribe((res) =>{
        console.log(res);
        this.router.navigate(['/articles'])
    })
  }
}
