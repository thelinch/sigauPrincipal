import { TestBed } from '@angular/core/testing';

import { TipoRequisitoService } from './tipo-requisito.service';

describe('TipoRequisitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoRequisitoService = TestBed.get(TipoRequisitoService);
    expect(service).toBeTruthy();
  });
});
