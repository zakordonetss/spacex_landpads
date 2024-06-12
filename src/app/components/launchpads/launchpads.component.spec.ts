import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpadsComponent } from './launchpads.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('LaunchpadsComponent', () => {
  let component: LaunchpadsComponent;
  let fixture: ComponentFixture<LaunchpadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchpadsComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchpadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
