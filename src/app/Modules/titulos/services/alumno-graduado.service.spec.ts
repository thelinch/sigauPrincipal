import { TestBed } from '@angular/core/testing';

import { AlumnoGraduadoService } from './alumno-graduado.service';

describe('AlumnoGraduadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlumnoGraduadoService = TestBed.get(AlumnoGraduadoService);
    expect(service).toBeTruthy();
  });
});
