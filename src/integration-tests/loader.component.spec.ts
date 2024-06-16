import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from 'src/app/services/loader.service';
import { By } from '@angular/platform-browser';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent, MatProgressBarModule],
      providers: [LoaderService],
    }).compileComponents();

    loaderService = TestBed.inject(LoaderService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the progress bar when loading is true', () => {
    loaderService.show();
    fixture.detectChanges();
    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).toBeTruthy();
  });

  it('should hide the progress bar when loading is false', () => {
    loaderService.hide();
    fixture.detectChanges();
    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).toBeFalsy();
  });
});
