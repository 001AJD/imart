import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private ps: ProductService) {}
  productDetails: any;
  pid = '0KoYl2PftIgEb39N0BSt';

  ngOnInit(): void {
    this.ps
      .getProductById(this.pid)
      .then((product) => {
        this.productDetails = product as Product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
