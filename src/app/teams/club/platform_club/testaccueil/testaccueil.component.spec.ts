import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestaccueilComponent } from './testaccueil.component';

describe('TestaccueilComponent', () => {
  let component: TestaccueilComponent;
  let fixture: ComponentFixture<TestaccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestaccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestaccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
