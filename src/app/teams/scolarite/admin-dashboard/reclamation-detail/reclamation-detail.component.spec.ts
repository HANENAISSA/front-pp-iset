import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationDetailComponent } from './reclamation-detail.component';

describe('ReclamationDetailComponent', () => {
  let component: ReclamationDetailComponent;
  let fixture: ComponentFixture<ReclamationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
