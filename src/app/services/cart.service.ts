import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  user: AngularFirestoreDocument<any>;
  cart: Observable<any>;
  userId: string;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  addProductToCart(product): void {
    this.userId = this.authService.user.uid;
    this.afs
      .collection('users')
      .doc(`${this.userId}`)
      .update({ cart: firebase.firestore.FieldValue.arrayUnion(product) });
  }

  async getCartProducts(): Promise<any> {
    this.user = this.afs.collection('users').doc(`${this.userId}`);
    this.cart = this.user.snapshotChanges();
    console.log(this.cart);


  }
}
