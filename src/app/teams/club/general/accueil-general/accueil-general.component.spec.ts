import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilGeneralComponent } from './accueil-general.component';

describe('AccueilGeneralComponent', () => {
  let component: AccueilGeneralComponent;
  let fixture: ComponentFixture<AccueilGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
