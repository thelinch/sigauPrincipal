import { TestBed } from '@angular/core/testing';

import { RectorService } from './rector.service';

describe('RectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RectorService = TestBed.get(RectorService);
    expect(service).toBeTruthy();
  });
});
