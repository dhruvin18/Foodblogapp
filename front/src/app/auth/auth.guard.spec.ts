import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { UserService } from '../shared/user.service';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

class MockRouter {
  navigate(path) {}
}
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService;
  let router;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/cookies'};
  const routerMock = {navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', async(inject([HttpTestingController, UserService], (httpClient: HttpTestingController, service: UserService) => {
    expect(guard).toBeTruthy();
  })));


  it('should return true for a logged in user', () => {
    authService = { isLoggedIn: () => true };
    router = new MockRouter();
    guard = new AuthGuard(authService, router);
    expect(guard.canActivate(routeMock, routeStateMock)).toBe(true);
    });
  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});


// describe('AuthGuard', () => {
//   describe('canActivate', () => {
//     let authGuard: AuthGuard;

//   });
// });
