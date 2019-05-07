import { TestBed } from '@angular/core/testing';

import { ObtenciongradosService } from './obtenciongrados.service';

describe('ObtenciongradosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenciongradosService = TestBed.get(ObtenciongradosService);
    expect(service).toBeTruthy();
  });
});
