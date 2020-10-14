import { TestBed } from '@angular/core/testing';

import { BuscartrailersService } from './buscartrailers.service';

describe('BuscartrailersService', () => {
  let service: BuscartrailersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscartrailersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
