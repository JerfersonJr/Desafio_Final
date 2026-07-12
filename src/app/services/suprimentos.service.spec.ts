import { TestBed } from '@angular/core/testing';

import { SuprimentosService } from './suprimentos.service';

describe('SuprimentosService', () => {
  let service: SuprimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuprimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
