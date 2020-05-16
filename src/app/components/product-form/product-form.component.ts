import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = {} as Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  addProduct() {
    if (this.validProduct(this.product)) {
      this.product.instock = true;
      this.product.lastsell = new Date();
      this.productService.addProduct(this.product);
      this.product = {} as Product;
    }      
  }

  validProduct(product: Product): boolean {
    let valido: boolean = false;
    valido = product.quantity ? true : false;
    return valido;
  }

}
