import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandpadsComponent } from './landpads.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('LandpadsComponent', () => {
  let component: LandpadsComponent;
  let fixture: ComponentFixture<LandpadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandpadsComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LandpadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
