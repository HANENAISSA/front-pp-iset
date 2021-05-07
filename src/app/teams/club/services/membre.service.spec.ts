import { TestBed } from '@angular/core/testing';

import { MembreService } from './membre.service';

describe('MembreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembreService = TestBed.get(MembreService);
    expect(service).toBeTruthy();
  });
});
