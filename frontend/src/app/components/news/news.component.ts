import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {DisplayNewsService} from '../../services/display-news.service'
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private displayNewsService : DisplayNewsService) { }

  newsList : any;
  ngOnInit(): void {
    

    //HTTP always returns an observable, thats why use subscribe function 
    this.displayNewsService.dislayNews().subscribe(data => 
      this.newsList = data
    );
    
  }

}
