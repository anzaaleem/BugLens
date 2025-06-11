import { TestBed } from '@angular/core/testing';
import { CustomErrorHandlerService } from './custom-error-handler';
import { provideHttpClient } from '@angular/common/http';

describe('CustomErrorHandlerService', () => {
  let service: CustomErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(CustomErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
