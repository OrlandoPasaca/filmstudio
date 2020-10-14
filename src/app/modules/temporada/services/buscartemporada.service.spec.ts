import { TestBed } from '@angular/core/testing';

import { BuscartemporadaService } from './buscartemporada.service';

describe('BuscartemporadaService', () => {
  let service: BuscartemporadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscartemporadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
