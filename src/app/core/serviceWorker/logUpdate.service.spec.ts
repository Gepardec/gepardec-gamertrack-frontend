import { TestBed } from '@angular/core/testing';

import { LogUpdateService } from './logUpdate.service';

describe('LogUpdateServiceService', () => {
  let service: LogUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
