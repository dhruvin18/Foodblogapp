import { Restaurant } from './../../shared/restaurant.model';
import { RestaurantService } from './../../shared/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants: Restaurant[];
  
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
      this.restaurants = data;
    });
  }

}
