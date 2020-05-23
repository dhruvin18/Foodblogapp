import { Restaurant } from './../../shared/restaurant.model';
import { RestaurantService } from './../../shared/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[];
  search = 'Delhi';
  constructor(private restaurantService: RestaurantService, private router: Router) { }

  model = {
    q: ''
  };

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
      this.restaurants = data;
    });
    // this.restaurantService.getSearchResults(this.search).subscribe((data: Restaurant[]) => {
    //   this.restaurants = data;
    // });
  }
  displayMore(id: string) {
    console.log(id);
    const navigationExtras: NavigationExtras = {
      queryParams: {
          _id: id
        }
    };
    this.router.navigate(['restaurant'], navigationExtras);
  }
  getSearchResults() {
    this.restaurantService.getSearchResults(this.model.q).subscribe((data: Restaurant[]) => {
      this.restaurants = data;
    });
  }

}
