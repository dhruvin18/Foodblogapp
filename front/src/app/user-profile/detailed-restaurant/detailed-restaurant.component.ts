import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../shared/restaurant.service';
import { Restaurant } from '../../shared/restaurant.model';

@Component({
  selector: 'app-detailed-restaurant',
  templateUrl: './detailed-restaurant.component.html',
  styleUrls: ['./detailed-restaurant.component.css']
})
export class DetailedRestaurantComponent implements OnInit {
  id: string;
  restaurant;
  constructor(private route: ActivatedRoute, private restService: RestaurantService) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      console.log(params._id);
      this.id = params._id;

      this.restService.getRestaurant(this.id).subscribe(
        (res) => {
          // console.log(res);
          this.restaurant = res;
        }
      );

    });
  }

  ngOnInit(): void {
  }

}
