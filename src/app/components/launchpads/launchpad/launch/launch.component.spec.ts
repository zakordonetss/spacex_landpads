import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchComponent } from './launch.component';
import { ILaunch } from '@models'; // Adjust the import according to your project structure
import { By } from '@angular/platform-browser';

describe('LaunchComponent', () => {
  let component: LaunchComponent;
  let fixture: ComponentFixture<LaunchComponent>;

  const mockLaunch: ILaunch = {
    name: 'Test Launch',
    id: '123',
    links: { wikipedia: 'https://en.wikipedia.org/wiki/Test_Launch' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.launch = mockLaunch;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the launch name', () => {
    component.launch = mockLaunch;
    fixture.detectChanges();
    const nameElement = fixture.debugElement.query(
      By.css('.Name')
    ).nativeElement;
    expect(nameElement.textContent).toContain('Test Launch');
  });

  it('should display "Launch without name" if name is not provided', () => {
    component.launch = { id: '123', name: undefined };
    fixture.detectChanges();
    const nameElement = fixture.debugElement.query(
      By.css('.Name')
    ).nativeElement;
    expect(nameElement.textContent).toContain('Launch without name');
  });

  it('should have a link to Wikipedia', () => {
    component.launch = mockLaunch;
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(
      By.css('.Link')
    ).nativeElement;
    expect(linkElement.href).toBe('https://en.wikipedia.org/wiki/Test_Launch');
  });

  it('should open the Wikipedia link in a new tab', () => {
    component.launch = mockLaunch;
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(
      By.css('.Link')
    ).nativeElement;
    expect(linkElement.target).toBe('_blank');
  });

  it('should not render the Wikipedia link if it is not provided', () => {
    component.launch = { id: '123', name: 'Test Launch', links: {} };
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('.Link'));
    expect(linkElement).toBeNull();
  });
});
