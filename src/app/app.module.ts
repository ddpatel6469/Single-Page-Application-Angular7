import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductsPipe } from './products/products.pipe';
import { RatingComponent } from './products/rating/rating.component';
import { WelcomeComponent } from './misc/welcome/welcome.component';
import { NavbarComponent } from './misc/navbar/navbar.component';
import { DetailComponent } from './products/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { PanelComponent } from './misc/panel/panel.component';
import { TemplateComponent } from './form/template/template.component';
import { ReactiveComponent } from './form/reactive/reactive.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsPipe,
    RatingComponent,
    WelcomeComponent,
    NavbarComponent,
    DetailComponent,
    LoginComponent,
    PanelComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
