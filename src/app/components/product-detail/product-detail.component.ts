import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productDetails: any;
  pid = '0KoYl2PftIgEb39N0BSt';

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.ps.getProductById(this.pid).subscribe((product) => {
      this.productDetails = {
        title: product.title,
        description: product.description,
        price: product.price,
        manufacturer: product.manufacturer,
      };
    });
  }
}
