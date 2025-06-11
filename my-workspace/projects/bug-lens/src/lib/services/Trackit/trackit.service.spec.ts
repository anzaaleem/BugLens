import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TrackerService } from './trackit.service';

describe('TrackitService', () => {
  let service: TrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Use provideHttpClient instead of HttpClientModule
        TrackitService
      ]
    });
    service = TestBed.inject(TrackitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

