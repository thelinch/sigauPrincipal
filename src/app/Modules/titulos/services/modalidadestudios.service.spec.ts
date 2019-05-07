import { TestBed } from '@angular/core/testing';

import { ModalidadestudiosService } from './modalidadestudios.service';

describe('ModalidadestudiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalidadestudiosService = TestBed.get(ModalidadestudiosService);
    expect(service).toBeTruthy();
  });
});
