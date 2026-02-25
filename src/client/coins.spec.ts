import { TestBed } from '@angular/core/testing';

import { CoinsClient } from './coins-client';

describe('CoinsClient', () => {
  let service: CoinsClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinsClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
