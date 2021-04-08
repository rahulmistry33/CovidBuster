import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { DisplayArticleComponent } from './components/display-article/display-article.component';
import { EditComponentComponent } from './components/edit-component/edit-component.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MapsComponent } from './components/maps/maps.component';
import { NewsComponent } from './components/news/news.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'articles',component:ArticlesComponent},
  {path:'articles/:id',component:DisplayArticleComponent},
  {path:'editArticles/:id',component:EditComponentComponent},
  {path:'createArticles',component:CreateArticleComponent},
  {path:'news',component:NewsComponent},
  {path:'maps',component:MapsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
