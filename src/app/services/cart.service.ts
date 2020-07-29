import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any[];
  cartTotal: number;
  cartTotalItem: number;
  userId: string;
  products: Observable<any[]>;
  cartItems: Observable<any>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  addProductToCart(product): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;

        this.afs
          .collection('users')
          .doc<User>(this.userId)
          .get()
          .subscribe((userDoc) => {
            const data = userDoc.data().cart;

            /* check if the user cart is empty if user cart is empty add new product
              if user cart is not empty check if the product we are trying to add already exists
              if product already exists then just increas the quantity of the product in the user's cart
              if product does not exists in the user's cart then add it
            */

            if (data.length !== 0) {
              data.forEach((element) => {
                if (element.id === product.id) {
                  if (element.quantity < 15) {
                    element.quantity += 1;
                    this.afs
                      .collection('users')
                      .doc(this.userId)
                      .set({ cart: data }, { merge: true });
                  } else {
                    alert('Cannot order more than 15 units');
                  }
                } else {
                  this.afs
                    .collection('users')
                    .doc(this.userId)
                    .update({
                      cart: firebase.firestore.FieldValue.arrayUnion(product),
                    });
                }
              });
            } else {
              this.afs
                .collection('users')
                .doc(this.userId)
                .update({
                  cart: firebase.firestore.FieldValue.arrayUnion(product),
                });
            }
          });
      }
    });
  }

  // async getCartProducts(): Promise<any> {
  //   this.afAuth.authState.subscribe((user) => {
  //     if (user) {
  //       this.userId = user.uid;
  //       this.afs
  //         .collection('users')
  //         .doc<User>(`${this.userId}`)
  //         .valueChanges()
  //         .subscribe((userDoc) => {
  //           this.cart = userDoc.cart;
  //           this.updateCartTotal();
  //         });
  //     }
  //   });
  //   return this.cart;
  // }

  getCartproducts2(uid: string): Observable<any> {
    if (this.authService.isLoggedIn()) {
      this.cartItems = this.afs
        .collection('users')
        .doc<User>(uid)
        .valueChanges()
        .pipe(
          map((userDoc) => {
            const data = userDoc.cart;
            this.cart = data;
            this.updateCartTotal();
            return data;
          })
        );
      return this.cartItems;
    }
  }

  updateCartTotal(): void {
    let cartSum = Number(0);
    this.cart.forEach((element) => {
      cartSum += Number(element.price) * Number(element.quantity);
    });
    this.afs
      .collection('users')
      .doc(this.userId)
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

  async getCartTotalItem(): Promise<any> {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;

        this.afs
          .collection('users')
          .doc<User>(`${this.userId}`)
          .valueChanges()
          .subscribe((userDoc) => {
            this.cartTotalItem = userDoc.cart.length;
          });
      }
    });
  }

  updateProductQty(product): void {
    console.log(product);
  }
}
