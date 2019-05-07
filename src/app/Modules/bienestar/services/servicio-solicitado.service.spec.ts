import { TestBed } from '@angular/core/testing';

import { ServicioSolicitadoService } from './servicio-solicitado.service';

describe('ServicioSolicitadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioSolicitadoService = TestBed.get(ServicioSolicitadoService);
    expect(service).toBeTruthy();
  });
});
