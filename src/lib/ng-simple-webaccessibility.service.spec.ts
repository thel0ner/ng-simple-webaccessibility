import { TestBed } from '@angular/core/testing';

import { NgSimpleWebaccessibilityService } from './ng-simple-webaccessibility.service';

describe('NgSimpleWebaccessibilityService', () => {
  let service: NgSimpleWebaccessibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgSimpleWebaccessibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
