import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReclamationsListComponent } from './student-reclamations-list.component';

describe('StudentReclamationsListComponent', () => {
  let component: StudentReclamationsListComponent;
  let fixture: ComponentFixture<StudentReclamationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentReclamationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentReclamationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
