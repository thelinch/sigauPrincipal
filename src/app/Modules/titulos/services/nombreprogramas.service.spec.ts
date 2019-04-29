import { TestBed } from '@angular/core/testing';

import { NombreprogramasService } from './nombreprogramas.service';

describe('NombreprogramasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NombreprogramasService = TestBed.get(NombreprogramasService);
    expect(service).toBeTruthy();
  });
});
