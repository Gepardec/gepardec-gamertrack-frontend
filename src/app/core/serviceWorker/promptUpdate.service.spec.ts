import { TestBed } from '@angular/core/testing';

import { PromptUpdate } from './promptUpdate';

describe('UpdateServiceService', () => {
  let service: PromptUpdate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptUpdate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
