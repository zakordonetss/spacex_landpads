import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ILandpad, IPaginationPage } from '@models';
import { LandpadsApiService } from 'src/app/services/landpads/landpads-api.service';

describe('LandpadsApiService Integration Test', () => {
  let service: LandpadsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LandpadsApiService,
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });
    service = TestBed.inject(LandpadsApiService);
  });

  it('should fetch landpads from SpaceX API', (done) => {
    const query = {};
    const options = { limit: 5 };

    service
      .getLandpads(query, options)
      .subscribe((response: IPaginationPage<ILandpad>) => {
        expect(response).toBeTruthy();
        expect(response.docs).toBeInstanceOf(Array);
        done();
      });
  });
});
