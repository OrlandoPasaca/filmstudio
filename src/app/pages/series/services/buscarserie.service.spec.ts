import { TestBed } from '@angular/core/testing';

import { BuscarSerieService } from './buscarserie.service';

describe('BuscarSerieService', () => {
  let service: BuscarSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarSerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
