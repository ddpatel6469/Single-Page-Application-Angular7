import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products/products.component';
import { WelcomeComponent } from './misc/welcome/welcome.component';
import { DetailComponent } from './products/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TemplateComponent } from './form/template/template.component';
import { ReactiveComponent } from './form/reactive/reactive.component';

const routes: Routes = [
  {path:"products",component:ProductsComponent, canActivate:[AuthGuard]},
  {path:"products/:pId",component:DetailComponent, canActivate:[AuthGuard]},
  {path:"template",component:TemplateComponent, canActivate:[AuthGuard]},
  {path:"reactive",component:ReactiveComponent, canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"welcome",component:WelcomeComponent, canActivate:[AuthGuard]},
  {path:"",redirectTo:"wecome", pathMatch:"full"},
  {path:"**",redirectTo:"welcome"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
