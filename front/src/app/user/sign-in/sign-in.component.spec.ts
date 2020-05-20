import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { UserComponent } from '../user.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../../shared/user.service';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let hostfixture: ComponentFixture<UserComponent>;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ SignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostfixture = TestBed.createComponent(UserComponent);
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(inject([HttpTestingController, UserService], (httpClient: HttpTestingController, service: UserService) => {
    expect(component).toBeTruthy();
  })));
});


