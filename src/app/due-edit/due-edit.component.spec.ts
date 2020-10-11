import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueEditComponent } from './due-edit.component';

describe('DueEditComponent', () => {
  let component: DueEditComponent;
  let fixture: ComponentFixture<DueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
