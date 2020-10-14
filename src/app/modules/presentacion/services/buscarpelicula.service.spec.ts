import { TestBed } from '@angular/core/testing';

import { BuscarpeliculaService } from './buscarpelicula.service';

describe('BuscarpeliculaService', () => {
  let service: BuscarpeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarpeliculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
