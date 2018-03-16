import { TestBed, inject } from '@angular/core/testing';

import { LostService } from './lost.service';

describe('LostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LostService]
    });
  });

  it('should be created', inject([LostService], (service: LostService) => {
    expect(service).toBeTruthy();
  }));
});
