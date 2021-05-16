import { TestBed } from '@angular/core/testing';

import { ReclamationService } from './reclamation.service';

describe('ReclamationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReclamationService = TestBed.get(ReclamationService);
    expect(service).toBeTruthy();
  });
});
