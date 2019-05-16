import { TestBed } from '@angular/core/testing';

import { DecanofacultadService } from './decanofacultad.service';

describe('DecanofacultadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecanofacultadService = TestBed.get(DecanofacultadService);
    expect(service).toBeTruthy();
  });
});
