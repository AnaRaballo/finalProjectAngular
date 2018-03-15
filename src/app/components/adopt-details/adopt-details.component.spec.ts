import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptDetailsComponent } from './adopt-details.component';

describe('AdoptDetailsComponent', () => {
  let component: AdoptDetailsComponent;
  let fixture: ComponentFixture<AdoptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
