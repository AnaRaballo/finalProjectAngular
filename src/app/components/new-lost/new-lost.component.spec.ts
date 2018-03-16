import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLostComponent } from './new-lost.component';

describe('NewLostComponent', () => {
  let component: NewLostComponent;
  let fixture: ComponentFixture<NewLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
