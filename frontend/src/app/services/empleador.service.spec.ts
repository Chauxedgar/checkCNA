import { TestBed } from '@angular/core/testing';

import { EmpleadorService } from './empleador.service';

describe('EmpleadorService', () => {
  let service: EmpleadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
