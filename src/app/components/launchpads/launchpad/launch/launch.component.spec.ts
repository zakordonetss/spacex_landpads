import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchComponent } from './launch.component';
import { ILaunch } from '@models'; // Adjust the import according to your project structure

describe('LaunchComponent', () => {
  let component: LaunchComponent;
  let fixture: ComponentFixture<LaunchComponent>;

  const mockLaunch: ILaunch = {
    name: 'Test Launch',
    id: '123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchComponent);
    component = fixture.componentInstance;
    component.launch = mockLaunch;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
