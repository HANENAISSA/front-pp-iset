import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParticipationComponent } from './liste-participation.component';

describe('ListeParticipationComponent', () => {
  let component: ListeParticipationComponent;
  let fixture: ComponentFixture<ListeParticipationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeParticipationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
