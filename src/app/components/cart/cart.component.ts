import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Observable<any>;
  qtyFormGroup: FormGroup;
  userId: string;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createQtyForm();
    this.cartService.getCartTotalItem();
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.authService
      .isLoggedIn()
      .then((userDoc) => {
        this.userId = userDoc.uid;
      })
      .then(() => {
        this.cartService.getCartproducts2(this.userId).subscribe((cart) => {
          this.cartItems = cart;
        });
      });
  }

  removeItem(
    pid: string,
    price: string,
    quantity: number,
    title1: string
  ): void {
    const cart = {
      id: pid,
      price: Number(price),
      quantity: Number(quantity),
      title: title1,
    };
    this.cartService.removeItemFromCart(cart);
  }

  updateProductQuantity(pid: string, price1: string, title1: string): void {
    const product = {
      id: pid,
      price: price1,
      title: title1,
      quantity: this.qtyFormGroup.get('quantity').value,
    };
    console.log(product);
    this.cartService.updateProductQty(product);
  }

  startShopping(): void {
    this.router.navigate(['product-list-2']);
  }

  createQtyForm(): void {
    this.qtyFormGroup = this.fb.group({
      quantity: [
        '5',
        [Validators.required, Validators.min(1), Validators.max(15)],
      ],
    });
  }
  getCartItems(): void {}
}
