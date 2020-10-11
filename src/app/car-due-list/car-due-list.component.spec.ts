import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDueListComponent } from './car-due-list.component';

describe('CarDueListComponent', () => {
  let component: CarDueListComponent;
  let fixture: ComponentFixture<CarDueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
