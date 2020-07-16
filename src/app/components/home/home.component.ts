import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[];

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
