import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReclamationComponent } from './new-reclamation.component';

describe('NewReclamationComponent', () => {
  let component: NewReclamationComponent;
  let fixture: ComponentFixture<NewReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
