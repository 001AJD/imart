import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';

import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { SortBarComponent } from './components/shared/sort-bar/sort-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductList2Component } from './components/product-list2/product-list2.component';
import { FilterPaletteComponent } from './components/shared/filter-palette/filter-palette.component';
import { SideFilterPaletteComponent } from './components/shared/side-filter-palette/side-filter-palette.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    SortBarComponent,
    ProductListComponent,
    CartComponent,
    ProductList2Component,
    FilterPaletteComponent,
    SideFilterPaletteComponent,
    ProductDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [ProductService, AuthService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
