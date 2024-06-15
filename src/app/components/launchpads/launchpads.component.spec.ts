import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LaunchpadsComponent } from './launchpads.component';
import { LaunchpadsApiService } from 'src/app/services/launchpads/launchpads-api.service';
import { ILaunchpad, IPaginationPage } from '@models';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

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
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        LaunchpadsComponent,
        LaunchpadsApiService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchpadsComponent);
    component = fixture.componentInstance;
    launchpadsApiService = TestBed.inject(LaunchpadsApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle page change', fakeAsync(() => {
    spyOn(launchpadsApiService, 'getLaunchpads').and.returnValue(
      of(mockLaunchpadsPage)
    );
    component.ngOnInit();
    fixture.detectChanges();

    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 20 };
    component.handlePageChange(pageEvent);
    tick(500); // to handle debounce time

    fixture.detectChanges();

    expect(launchpadsApiService.getLaunchpads).toHaveBeenCalledWith(
      jasmine.any(Object),
      jasmine.objectContaining({ limit: 10, page: 2 })
    );
  }));

  it('should filter launchpads', fakeAsync(() => {
    spyOn(launchpadsApiService, 'getLaunchpads').and.returnValue(
      of(mockLaunchpadsPage)
    );
    component.ngOnInit();
    fixture.detectChanges();

    component.filterControl.setValue('Region 1');
    tick(500);

    expect(launchpadsApiService.getLaunchpads).toHaveBeenCalledWith(
      jasmine.objectContaining({
        $or: [
          { name: { $regex: 'Region 1', $options: 'i' } },
          { region: { $regex: 'Region 1', $options: 'i' } },
        ],
      }),
      jasmine.any(Object)
    );
  }));

  it('should display "No items found" when no launchpads are available', fakeAsync(() => {
    const emptyPage: IPaginationPage<ILaunchpad> = {
      ...mockLaunchpadsPage,
      docs: [],
    };
    spyOn(launchpadsApiService, 'getLaunchpads').and.returnValue(of(emptyPage));
    component.ngOnInit();
    fixture.detectChanges();
    tick(500); // to handle debounce time

    const emptyElement = fixture.nativeElement.querySelector('.Empty');
    expect(emptyElement.textContent).toContain('No items found');
  }));

  it('should clear filter when clear button is clicked', fakeAsync(() => {
    spyOn(launchpadsApiService, 'getLaunchpads').and.returnValue(
      of(mockLaunchpadsPage)
    );

    component.filterControl.setValue('Region 1');
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.ClearButton');
    expect(clearButton).toBeTruthy();

    clearButton.click();
    tick(500); // Wait for debounce time

    expect(component.filterControl.value).toBe('');
  }));

  it('should unsubscribe from filterControl subscriptions on component destroy', () => {
    component.ngOnInit();
    spyOn(component['_filterValueChangeSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['_filterValueChangeSub'].unsubscribe).toHaveBeenCalled();
  });
});
