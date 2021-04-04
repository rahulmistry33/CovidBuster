import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import {ArticlesService} from '../../services/articles.service';
import { ActivatedRoute,Params } from '@angular/router';


@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  constructor(public articlesService: ArticlesService,private route:ActivatedRoute,private router:Router) { }

  article : any;
  id : String;
  ngOnInit(): void {
      this.route.params.subscribe((params:Params) => {
        this.id = params['id']
    });
    this.articlesService.fetchArticlesById(this.id).subscribe(data => 
      // this.article.title = data.title,
      // this.article.description = data.description
      this.article = data
    );

    
  }
  onSubmit(form :NgForm){
    this.articlesService.editArticles(this.id,this.article).subscribe((res) =>{
        console.log(res);
        this.router.navigate(['/articles'])
    })
  }

}
