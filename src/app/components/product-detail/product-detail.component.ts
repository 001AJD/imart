import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productDetails: any;

  orderQuantityFormGroup: FormGroup;

  pid = ''; // get value of this var from route

  constructor(
    private ps: ProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pid = this.activatedRoute.snapshot.params.id;
    this.createOrderQuantityForm();
    this.getProductDetails(this.pid);
  }

  getProductDetails(pid: string): void {
    this.ps.getProductById(this.pid).subscribe((product) => {
      this.productDetails = {
        title: product.title,
        description: product.description,
        price: product.price,
        manufacturer: product.manufacturer,
      };
    });
  }

  createOrderQuantityForm(): void {
    this.orderQuantityFormGroup = this.fb.group({
      quantity: [
        '1',
        [Validators.required, Validators.min(1), Validators.max(15)],
      ],
    });
  }

  incrementQuantity(): void {
    let num = Number(this.orderQuantityFormGroup.get('quantity').value);
    if (num < 15) {
      num += 1;
      this.orderQuantityFormGroup.get('quantity').setValue(num);
    }
  }

  decrementQuantity(): void {
    let num = Number(this.orderQuantityFormGroup.get('quantity').value);
    if (num > 1) {
      num -= 1;
      this.orderQuantityFormGroup.get('quantity').setValue(num);
    }
  }

  checkOrderQuantity(event: Event): void {
    const num = this.orderQuantityFormGroup.get('quantity').value;
    if (num < 1) {
      this.orderQuantityFormGroup.get('quantity').setValue(1);
    }
    if (num > 15) {
      this.orderQuantityFormGroup.get('quantity').setValue(15);
    }
  }

  addToCart(pid: string, productTitle: string, productPrice: string): void {
    const qty = this.orderQuantityFormGroup.get('quantity').value;
    const product = {
      id: pid,
      title: productTitle,
      price: Number(productPrice),
      quantity: Number(qty),
    };

    if (this.authService.user) {
      this.cartService.addProductToCart(product);
    } else {
      alert('login to add to cart');
    }
  }
}
