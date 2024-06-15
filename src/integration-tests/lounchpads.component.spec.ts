import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LaunchpadsApiService } from 'src/app/services/launchpads/launchpads-api.service';
import { ILaunchpad, IPaginationPage } from '@models';
import { LaunchpadsComponent } from 'src/app/components/launchpads/launchpads.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LaunchpadComponent } from 'src/app/components/launchpads/launchpad/launchpad.component';

describe('LaunchpadsComponent', () => {
  let component: LaunchpadsComponent;
  let fixture: ComponentFixture<LaunchpadsComponent>;
  let launchpadsApiService: LaunchpadsApiService;

  const mockLaunchpadsPage: IPaginationPage<ILaunchpad> = {
    docs: [
      { id: '1', name: 'Launchpad 1', region: 'Region 1', launches: [] },
      { id: '2', name: 'Launchpad 2', region: 'Region 2', launches: [] },
    ],
    totalDocs: 2,
    limit: 5,
    offset: 0,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: 0,
    nextPage: 2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BrowserAnimationsModule, BrowserModule],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchpadsComponent);
    component = fixture.componentInstance;
    launchpadsApiService = TestBed.inject(LaunchpadsApiService);
  });

  it('should fetch and display launchpads with LaunchpadComponent', fakeAsync(() => {
    spyOn(launchpadsApiService, 'getLaunchpads').and.returnValue(
      of(mockLaunchpadsPage)
    );
    component.ngOnInit();
    fixture.detectChanges();
    tick(500); // to handle debounce time
    fixture.detectChanges();

    const launchpadComponents =
      fixture.debugElement.nativeElement.querySelectorAll('app-launchpad');

    expect(launchpadComponents.length).toBe(2);
    expect(launchpadComponents[0].textContent).toContain('Launchpad 1');
    expect(launchpadComponents[1].textContent).toContain('Launchpad 2');
  }));

  it('should pass launchpad data to LaunchpadComponent', fakeAsync(() => {
    spyOn(launchpadsApiService, 'getLaunchpads').and.returnValue(
      of(mockLaunchpadsPage)
    );
    component.ngOnInit();
    fixture.detectChanges();
    tick(500); // to handle debounce time
    fixture.detectChanges();

    const launchpadNativeElements =
      fixture.debugElement.nativeElement.querySelectorAll('app-launchpad');
    expect(launchpadNativeElements.length).toBe(2);
    expect(launchpadNativeElements[0].textContent).toContain('Launchpad 1');
    expect(launchpadNativeElements[1].textContent).toContain('Launchpad 2');

    const launchpadComponents = fixture.debugElement.queryAll(
      By.directive(LaunchpadComponent)
    );
    expect(launchpadComponents.length).toBe(2);

    const launchpad1 = launchpadComponents[0].componentInstance.launchpad;
    const launchpad2 = launchpadComponents[1].componentInstance.launchpad;

    expect(launchpad1.id).toBe('1');
    expect(launchpad1.name).toBe('Launchpad 1');
    expect(launchpad1.region).toBe('Region 1');

    expect(launchpad2.id).toBe('2');
    expect(launchpad2.name).toBe('Launchpad 2');
    expect(launchpad2.region).toBe('Region 2');
  }));
});
