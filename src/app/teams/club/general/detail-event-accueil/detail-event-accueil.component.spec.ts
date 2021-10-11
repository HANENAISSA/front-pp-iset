import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventAccueilComponent } from './detail-event-accueil.component';

describe('DetailEventAccueilComponent', () => {
  let component: DetailEventAccueilComponent;
  let fixture: ComponentFixture<DetailEventAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEventAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEventAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
