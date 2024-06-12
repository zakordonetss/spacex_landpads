import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { LaunchpadsApiService } from './launchpads-api.service';
import { ILaunchpad, IRequestOptions } from '@models';
import { provideHttpClient } from '@angular/common/http';

describe('LaunchpadsApiService', () => {
  let service: LaunchpadsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LaunchpadsApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(LaunchpadsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the correct request body with provided query and options', () => {
    const dummyQuery: Partial<ILaunchpad> = { name: 'FalconSat' };
    const dummyOptions: IRequestOptions = { limit: 5 };

    const expectedBody = { query: dummyQuery, options: dummyOptions };

    service.getLaunchpads(dummyQuery, dummyOptions).subscribe();

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedBody);
    req.flush([]);
  });
});
