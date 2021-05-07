import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccueilComponent } from './dashboard-accueil.component';

describe('DashboardAccueilComponent', () => {
  let component: DashboardAccueilComponent;
  let fixture: ComponentFixture<DashboardAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
