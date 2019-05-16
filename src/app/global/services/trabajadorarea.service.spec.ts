import { TestBed } from '@angular/core/testing';

import { TrabajadorareaService } from './trabajadorarea.service';

describe('TrabajadorareaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrabajadorareaService = TestBed.get(TrabajadorareaService);
    expect(service).toBeTruthy();
  });
});
