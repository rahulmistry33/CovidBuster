import { TestBed } from '@angular/core/testing';

import { CovidcasesService } from './covidcases.service';

describe('CovidcasesService', () => {
  let service: CovidcasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidcasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
