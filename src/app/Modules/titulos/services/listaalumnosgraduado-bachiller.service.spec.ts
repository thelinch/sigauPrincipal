import { TestBed } from '@angular/core/testing';

import { listaAlumnosgraduadoBachillerService } from './listaalumnosgraduado-bachiller.service';

describe('ListaalumnosgraduadoBachillerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: listaAlumnosgraduadoBachillerService = TestBed.get(listaAlumnosgraduadoBachillerService);
    expect(service).toBeTruthy();
  });
});
