import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { LaunchpadComponent } from './launchpad.component';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatExpansionModule, MatAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchpadComponent);
    component = fixture.componentInstance;

    component.launchpad = mockLaunchpad;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
