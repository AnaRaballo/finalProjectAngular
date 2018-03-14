import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdoptionComponent } from './new-adoption.component';

describe('NewAdoptionComponent', () => {
  let component: NewAdoptionComponent;
  let fixture: ComponentFixture<NewAdoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
