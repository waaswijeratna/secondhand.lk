import { TestBed } from '@angular/core/testing';

import { ApiPathsService } from './api-paths.service';

describe('ApiPathsService', () => {
  let service: ApiPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
