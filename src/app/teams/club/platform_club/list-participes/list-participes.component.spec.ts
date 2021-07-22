import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticipesComponent } from './list-participes.component';

describe('ListParticipesComponent', () => {
  let component: ListParticipesComponent;
  let fixture: ComponentFixture<ListParticipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListParticipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParticipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
