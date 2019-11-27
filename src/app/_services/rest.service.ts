import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //  Expose the API for components

  createCustomerForm(form) {
    const myHeaders = new HttpHeaders()
      .set('X', 'X header')
      .set('Y', 'Y Header');

    return this.http.post(this.baseUrl, form, { headers: myHeaders });
  }

  updateCustomerForm(form) {
    const myHeaders = new HttpHeaders()
      .set('X', 'X header')
      .set('Y', 'Y Header');

    return this.http.put(this.baseUrl, form, { headers: myHeaders });
  }

  validateKey(key) {
    return this.http.get(this.baseUrl + `/validate/${key}`);
  }
}
