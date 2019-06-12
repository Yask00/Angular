import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Route, PreloadingStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SelectiveStrategy implements PreloadingStrategy {

  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
        return load();
    }

    return of(null);
  }
}
