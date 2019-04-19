import { TestBed } from '@angular/core/testing';

import { EscuelaprofesionalService } from './escuelaprofesional.service';

describe('EscuelaprofesionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscuelaprofesionalService = TestBed.get(EscuelaprofesionalService);
    expect(service).toBeTruthy();
  });
});
