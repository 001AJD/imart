import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list2',
  templateUrl: './product-list2.component.html',
  styleUrls: ['./product-list2.component.css'],
})
export class ProductList2Component implements OnInit {
  heading: string;
  products: any[];
  sortOption = [
    { name: 'Default', value: 'all' },
    { name: 'Price: Low to high', value: 'asc' },
    { name: 'Price: High to low', value: 'desc' },
  ];
  constructor(
    private ps: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe((data) => {
      this.products = data;
    });

    const h = this.router.url;
    this.heading = h.replace('/', ' ');
  }

  sortProducts(sortOrder: string): void {
    if (sortOrder === 'all') {
      this.ps.getAllMobile().subscribe((data) => {
        this.products = data;
      });
    } else {
      this.ps.getMobileBySort(sortOrder).subscribe((data) => {
        this.products = data;
      });
    }
  }

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
}
