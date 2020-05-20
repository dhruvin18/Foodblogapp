import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { UserService } from '../shared/user.service';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
class MockRouter {
  navigate(path) {}
}
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  const routerMock = {navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      declarations: [ UserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(inject([HttpTestingController, UserService], (httpClient: HttpTestingController, service: UserService) => {
    expect(component).toBeTruthy();
  })));
});
