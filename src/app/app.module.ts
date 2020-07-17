import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';

import { SortBarComponent } from './components/shared/sort-bar/sort-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    SortBarComponent,
    ProductListComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ScrollingModule,
    FormsModule,
  ],
  providers: [ProductService, AuthService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
