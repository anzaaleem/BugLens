import { TestBed } from '@angular/core/testing';

import { BugLensService } from './bug-lens.service';

describe('BugLensService', () => {
  let service: BugLensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugLensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
