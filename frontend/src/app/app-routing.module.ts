import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MapsComponent } from './components/maps/maps.component';
import { NewsComponent } from './components/news/news.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'articles',component:ArticlesComponent},
  {path:'news',component:NewsComponent},
  {path:'maps',component:MapsComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
