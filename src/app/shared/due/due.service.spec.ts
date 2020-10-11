import { TestBed } from '@angular/core/testing';

import { DueService } from './due.service';

describe('DueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DueService = TestBed.get(DueService);
    expect(service).toBeTruthy();
  });
});
