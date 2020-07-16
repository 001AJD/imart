import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  selectedOption: string;
  products: any[];
  heading: string;
  sortOption = [
    { name: 'Default', value: 'all' },
    { name: 'Price: Low to high', value: 'asc' },
    { name: 'Price: High to low', value: 'desc' },
  ];
  constructor(private ps: ProductService, private route: Router) {}

  ngOnInit(): void {
    const h = this.route.url;
    this.heading = h.replace('/', ' ');

    this.ps.getAllMobile().subscribe((data) => {
      this.products = data;
    });
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
}
