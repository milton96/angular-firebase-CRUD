import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products: Product[] = [];
  private editProduct: Product;
  private editing: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  setData(product: Product): void {
    this.editing = !this.editing;
    this.editProduct = product;
  }

  update(): void {
    console.log(this.editProduct);
    this.productService.updateProduct(this.editProduct);
    this.editProduct = {} as Product;
    this.editing = false;
  }

  delete(event: any, product: Product): void {
    if(confirm('Are you sure you want to delete it?'))
      this.productService.deleteProduct(product);
  }

}
