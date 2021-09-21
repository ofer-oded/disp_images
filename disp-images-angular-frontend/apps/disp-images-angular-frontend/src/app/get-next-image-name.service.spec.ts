import { TestBed } from '@angular/core/testing';

import { GetNextImageNameService } from './get-next-image-name.service';

describe('GetNextImageNameService', () => {
  let service: GetNextImageNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNextImageNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
