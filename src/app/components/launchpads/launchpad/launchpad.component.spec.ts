import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { By } from '@angular/platform-browser';

import { LaunchpadComponent } from './launchpad.component';
import { LaunchComponent } from './launch/launch.component';
import { ILaunchpad, ELaunchpadStatus } from '@models';

describe('LaunchpadComponent', () => {
  let component: LaunchpadComponent;
  let fixture: ComponentFixture<LaunchpadComponent>;

  const mockLaunchpad: ILaunchpad = {
    id: '123',
    name: 'Launch Complex 39A',
    status: ELaunchpadStatus.active,
    locality: 'Merritt Island',
    region: 'Florida',
    timezone: 'America/New_York',
    latitude: 28.5721,
    longitude: -80.648,
    launch_attempts: 80,
    launch_successes: 75,
    rockets: ['falcon9', 'starship'],
    launches: [
      {
        id: 'launch1',
        name: 'Falcon 9 Demo Flight',
      },
      {
        id: 'launch2',
        name: 'Starship SN8 Test Flight',
      },
    ],
  };

  const emptyLaunchpad: ILaunchpad = {
    id: '123',
    name: 'Launch Complex 39A',
    status: ELaunchpadStatus.active,
    locality: 'Merritt Island',
    region: 'Florida',
    timezone: 'America/New_York',
    latitude: 28.5721,
    longitude: -80.648,
    launch_attempts: 80,
    launch_successes: 75,
    rockets: ['falcon9', 'starship'],
    launches: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatExpansionModule, LaunchComponent],
      providers: [LaunchpadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchpadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.launchpad = mockLaunchpad;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the launchpad name', () => {
    component.launchpad = mockLaunchpad;
    fixture.detectChanges();
    const nameElement = fixture.debugElement.query(
      By.css('mat-panel-title')
    ).nativeElement;
    expect(nameElement.textContent).toContain('Launch Complex 39A');
  });

  it('should display the launchpad region', () => {
    component.launchpad = mockLaunchpad;
    fixture.detectChanges();
    const regionElement = fixture.debugElement.query(
      By.css('mat-panel-description')
    ).nativeElement;
    expect(regionElement.textContent).toContain('Florida');
  });

  it('should display the launches', () => {
    component.launchpad = mockLaunchpad;
    fixture.detectChanges();
    const launchElements = fixture.debugElement.queryAll(By.css('app-launch'));
    expect(launchElements.length).toBe(2);
    expect(launchElements[0].componentInstance.launch.name).toBe(
      'Falcon 9 Demo Flight'
    );
    expect(launchElements[1].componentInstance.launch.name).toBe(
      'Starship SN8 Test Flight'
    );
  });

  it('should display "Launchpad without launches" if no launches are provided', () => {
    component.launchpad = emptyLaunchpad;
    fixture.detectChanges();
    const emptyElement = fixture.debugElement.query(
      By.css('.Empty')
    ).nativeElement;
    expect(emptyElement.textContent).toContain('Launchpad without launches');
  });

  it('should not display "Launchpad without launches" if launches are provided', () => {
    component.launchpad = mockLaunchpad;
    fixture.detectChanges();
    const emptyElement = fixture.debugElement.query(By.css('.Empty'));
    expect(emptyElement).toBeNull();
  });
});
