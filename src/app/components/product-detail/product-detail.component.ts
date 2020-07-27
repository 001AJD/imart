import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productDetails: any;

  orderQuantityFormGroup: FormGroup;

  pid = '0KoYl2PftIgEb39N0BSt'; // get value of this var from route

  constructor(private ps: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
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
}
