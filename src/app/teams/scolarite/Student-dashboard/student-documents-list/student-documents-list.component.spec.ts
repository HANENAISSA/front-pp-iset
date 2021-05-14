import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDocumentsListComponent } from './student-documents-list.component';

describe('StudentDocumentsListComponent', () => {
  let component: StudentDocumentsListComponent;
  let fixture: ComponentFixture<StudentDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
