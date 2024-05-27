import { TestBed } from '@angular/core/testing';

import { ForcastService } from './forcast.service';

describe('ForcastService', () => {
  let service: ForcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
