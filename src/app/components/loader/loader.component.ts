import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.sass',
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
