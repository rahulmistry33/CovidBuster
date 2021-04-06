import { Component, OnInit } from '@angular/core';
import {CovidcasesService} from '../../services/covidcases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private covidcasesService:CovidcasesService) { }

  covidCases : any;
  ngOnInit(): void {
    this.covidcasesService.getCount().subscribe( data =>
      this.covidCases = data
    );

  }
  

}
