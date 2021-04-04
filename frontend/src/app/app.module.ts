import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MapsComponent } from './components/maps/maps.component';
import { NewsComponent } from './components/news/news.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/login/login.component';
import { DisplayArticleComponent } from './components/display-article/display-article.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';

// services
import {DisplayNewsService} from './services/display-news.service';
import {ArticlesService} from './services/articles.service';

//modules:
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { EditComponentComponent } from './components/edit-component/edit-component.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MapsComponent,
    NewsComponent,
    ArticlesComponent,
    LoginComponent,
    DisplayArticleComponent,
    CreateArticleComponent,
    EditComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //import the module here, always :)
    FormsModule
  ],
  providers: [DisplayNewsService,ArticlesService],    // always add in providers list after you create a service
  bootstrap: [AppComponent]
})
export class AppModule { }
