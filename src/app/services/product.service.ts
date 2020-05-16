import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private collection = 'products';
  private productsCollection: AngularFirestoreCollection<Product>;
  private productDoc: AngularFirestoreDocument<Product>;
  private products: Observable<Product[]>;

  constructor(private firestore: AngularFirestore) {
    // this.products = this.firestore.collection<Product>(this.collection).valueChanges();
    this.productsCollection = this.firestore.collection(this.collection);
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    )
  }

  getProducts() {
    return this.products;
  }

  deleteProduct(product: Product) {
    this.productDoc = this.firestore.doc(this.collection + `/${product.id}`);
    this.productDoc.delete();
  }
}
