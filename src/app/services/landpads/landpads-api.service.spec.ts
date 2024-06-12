import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { LandpadsApiService } from './landpads-api.service';
import { ILandpad, IRequestOptions, IPaginationPage } from '@models';
import { provideHttpClient } from '@angular/common/http';

describe('LandpadsApiService', () => {
  let service: LandpadsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LandpadsApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(LandpadsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the correct request body with provided query and options', () => {
    const dummyQuery: Partial<ILandpad> = { name: 'FalconSat' };
    const dummyOptions: IRequestOptions = { limit: 5 };

    const expectedBody = { query: dummyQuery, options: dummyOptions };

    service.getLandpads(dummyQuery, dummyOptions).subscribe();

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedBody);
    req.flush([]);
  });
});
