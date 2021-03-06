import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[];

  constructor(
    private ps: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.ps.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnInit(): void {}

  addToCart(
    productId: string,
    productTitle: string,
    productPrice: number,
    productQuantity: string
  ): void {
    if (this.authService.user) {
      const product = {
        id: productId,
        title: productTitle,
        price: productPrice,
        quantity: Number(productQuantity),
      };
      this.cartService.addProductToCart(product);
    } else {
      alert('login to add Product to cart');
    }
  }
  AllProducts(): void {
    this.router.navigate(['mobile']);
  }
}
