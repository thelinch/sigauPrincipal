import { TestBed } from '@angular/core/testing';

import { DenominacionesService } from './denominaciones.service';

describe('DenominacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DenominacionesService = TestBed.get(DenominacionesService);
    expect(service).toBeTruthy();
  });
});
