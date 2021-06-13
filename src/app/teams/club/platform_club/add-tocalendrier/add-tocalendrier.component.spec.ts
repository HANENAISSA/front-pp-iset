import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTOcalendrierComponent } from './add-tocalendrier.component';

describe('AddTOcalendrierComponent', () => {
  let component: AddTOcalendrierComponent;
  let fixture: ComponentFixture<AddTOcalendrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTOcalendrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTOcalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
