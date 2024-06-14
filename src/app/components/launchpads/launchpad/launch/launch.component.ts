import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILaunch } from '@models';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchComponent {
  @Input({ required: true }) public launch: ILaunch;
}
