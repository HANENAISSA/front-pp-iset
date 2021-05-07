import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilClubComponent } from './accueil-club.component';

describe('AccueilClubComponent', () => {
  let component: AccueilClubComponent;
  let fixture: ComponentFixture<AccueilClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
