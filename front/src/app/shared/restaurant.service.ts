import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getAllRestaurants() {
    return this.http.get('http://localhost:3000/restaurants');
  }
  getRestaurant(id: string) {
    return this.http.get('http://localhost:3000/restaurant/' + id);
  }
}
