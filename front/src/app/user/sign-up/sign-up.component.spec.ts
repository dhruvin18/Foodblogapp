import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { appRoutes } from '../../routes';
import { UserService } from '../../shared/user.service';
import { UserComponent } from '../user.component';
import { HttpClientTestingModule, HttpTestingController } from '../../../../node_modules/@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
const router = '../../routes.ts';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  // let hostcomponent: UserComponent;
  let hostfixture: ComponentFixture<UserComponent>;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes), HttpClientTestingModule, FormsModule],
      declarations: [ SignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostfixture = TestBed.createComponent(UserComponent);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(inject([HttpTestingController, UserService], (httpClient: HttpTestingController, service: UserService) => {
    expect(component).toBeTruthy();
  })));
});
