import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartQuantity = 1;
  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {
    this.getAllProducts();
  }

  ngOnInit(): void {}

  getAllProducts(): void {
    this.cartService.getCartProducts();
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
  updateProductQuantity(
    pid: string,
    price1: string,
    title1: string,
    $event: Event
  ): void {
    const product = {
      id: pid,
      price: price1,
      title: title1,
    };
    console.log(product);
    console.log('quntity changed');
    console.log($event.target);
  }
}
