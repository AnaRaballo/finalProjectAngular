import { TestBed, inject } from '@angular/core/testing';

import { AdoptionService } from './adoption.service';

describe('AdoptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptionService]
    });
  });

  it('should be created', inject([AdoptionService], (service: AdoptionService) => {
    expect(service).toBeTruthy();
  }));
});
