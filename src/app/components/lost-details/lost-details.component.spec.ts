import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostDetailsComponent } from './lost-details.component';

describe('LostDetailsComponent', () => {
  let component: LostDetailsComponent;
  let fixture: ComponentFixture<LostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
