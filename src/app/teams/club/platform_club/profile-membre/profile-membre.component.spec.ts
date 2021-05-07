import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMembreComponent } from './profile-membre.component';

describe('ProfileMembreComponent', () => {
  let component: ProfileMembreComponent;
  let fixture: ComponentFixture<ProfileMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
