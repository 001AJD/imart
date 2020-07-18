import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any[];
  cartTotal: number;
  userId: string;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  addProductToCart(product): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.afs
          .collection('users')
          .doc(`${this.userId}`)
          .update({ cart: firebase.firestore.FieldValue.arrayUnion(product) });
      }
    });
  }

  async getCartProducts(): Promise<any> {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.afs
          .collection('users')
          .doc<User>(`${this.userId}`)
          .valueChanges()
          .subscribe((userDoc) => {
            this.cart = userDoc.cart;
            this.updateCartTotal();
          });
      }
    });
    return this.cart;
  }

  updateCartTotal(): void {
    let cartSum = Number(0);
    this.cart.forEach((element) => {
      cartSum += Number(element.price);
    });
    this.afs
      .collection('users')
      .doc(`${this.userId}`)
      .set({ cartTotal: Number(cartSum) }, { merge: true })
      .then(() => {
        this.afs
          .collection('users')
          .doc<User>(`${this.userId}`)
          .valueChanges()
          .subscribe((userDoc) => {
            this.cartTotal = userDoc.cartTotal;
          });
      });
  }

  removeItemFromCart(cart): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;

        this.afs
          .collection('users')
          .doc(`${this.userId}`)
          .set(
            {
              cart: firebase.firestore.FieldValue.arrayRemove(cart),
            },
            { merge: true }
          );
      }
    });
  }
}
