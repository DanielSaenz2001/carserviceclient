import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public DUE_API = this.API + '/cars';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-cars');
  }

  get(id: string) {
    return this.http.get(this.DUE_API + '/' + id);
  }

  save(due: any): Observable<any> {
    let result: Observable<Object>;
    if (due['href']) {
      result = this.http.put(due.href, due);
    } else {
      result = this.http.post(this.DUE_API, due);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
