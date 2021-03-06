import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Observable<Product[]>;
  product: Observable<any>;

  constructor(private af: AngularFirestore) {}

  getAllProducts(): Observable<Product[]> {
    this.products = this.af
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            {
              const data = a.payload.doc.data() as Product;
              return {
                id: a.payload.doc.id,
                title: data.title,
                description: data.description,
                price: data.price,
              };
            }
          })
        )
      );
    return this.products;
  }

  getAllMobile(): Observable<Product[]> {
    this.products = this.af
      .collection('products', (ref) => ref.where('category', '==', 'mobile'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Product;
            return {
              id: a.payload.doc.id,
              title: data.title,
              description: data.description,
              price: data.price,
            };
          })
        )
      );

    return this.products;
  }

  getMobileBySort(sortOrder: string): Observable<Product[]> {
    if (sortOrder === 'asc') {
      this.products = this.af
        .collection('products', (ref) =>
          ref.where('category', '==', 'mobile').orderBy('price', sortOrder)
        )
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data() as Product;
              return {
                id: a.payload.doc.id,
                title: data.title,
                description: data.description,
                price: data.price,
              };
            })
          )
        );
    } else if (sortOrder === 'desc') {
      this.products = this.af
        .collection('products', (ref) =>
          ref.where('category', '==', 'mobile').orderBy('price', 'desc')
        )
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data() as Product;
              return {
                id: a.payload.doc.id,
                title: data.title,
                description: data.description,
                price: data.price,
              };
            })
          )
        );
    } else {
    }

    return this.products;
  }

  getProductById(pid: string): Observable<any> {
    this.product = this.af.collection('products').doc(pid).valueChanges();
    return this.product;
  }
}
