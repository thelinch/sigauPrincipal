import { TestBed } from '@angular/core/testing';

import { AlumnoRequisitoService } from './alumno-requisito.service';

describe('AlumnoRequisitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlumnoRequisitoService = TestBed.get(AlumnoRequisitoService);
    expect(service).toBeTruthy();
  });
});
