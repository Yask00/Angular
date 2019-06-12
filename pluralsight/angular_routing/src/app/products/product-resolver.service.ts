import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor (
    private productService: ProductService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id is not a number: ${id}`;
      console.error(message);
      return of({product: null, error: message});
      // false, null or navigate to error page via SERVICE, optional PARAMS, or Resolved data
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({product: product})),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ product: null, error: error});
        })
      );
  }
}
