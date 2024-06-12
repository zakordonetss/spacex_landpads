import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ILaunchpad, IPaginationPage } from '@models';
import { LaunchpadsApiService } from 'src/app/services/launchpads/launchpads-api.service';

describe('LaunchpadsApiService Integration Test', () => {
  let service: LaunchpadsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LaunchpadsApiService,
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });
    service = TestBed.inject(LaunchpadsApiService);
  });

  it('should fetch launchpads from SpaceX API', (done) => {
    const query = {};
    const options = { limit: 5 };

    service
      .getLaunchpads(query, options)
      .subscribe((response: IPaginationPage<ILaunchpad>) => {
        expect(response).toBeTruthy();
        expect(response.docs).toBeInstanceOf(Array);
        done();
      });
  });
});
