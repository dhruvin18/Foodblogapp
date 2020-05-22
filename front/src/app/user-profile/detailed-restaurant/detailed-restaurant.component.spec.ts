import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRestaurantComponent } from './detailed-restaurant.component';

describe('DetailedRestaurantComponent', () => {
  let component: DetailedRestaurantComponent;
  let fixture: ComponentFixture<DetailedRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
