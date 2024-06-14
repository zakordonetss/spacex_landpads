import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import { ILaunchpad } from '@models';
import { LaunchComponent } from './launch/launch.component';

@Component({
  selector: 'app-launchpad',
  standalone: true,
  imports: [LaunchComponent, MatExpansionModule, MatAccordion],
  templateUrl: './launchpad.component.html',
  styleUrl: './launchpad.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchpadComponent {
  @Input() public launchpad: ILaunchpad;
}
