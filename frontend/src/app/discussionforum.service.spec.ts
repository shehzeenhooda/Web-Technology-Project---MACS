import { TestBed } from '@angular/core/testing';

import { DiscussionforumService } from './discussionforum.service';

describe('DiscussionforumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscussionforumService = TestBed.get(DiscussionforumService);
    expect(service).toBeTruthy();
  });
});
