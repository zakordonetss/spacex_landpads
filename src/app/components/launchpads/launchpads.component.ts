import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ILaunchpad, IPaginationPage, IRequestOptions } from '@models';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { LaunchpadsApiService } from 'src/app/services/launchpads/launchpads-api.service';

@Component({
  selector: 'app-launchpads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './launchpads.component.html',
  styleUrl: './launchpads.component.sass',
})
export class LaunchpadsComponent implements OnInit {
  public launchpads$: Observable<ILaunchpad[]>;

  private readonly _searchTerms = new BehaviorSubject<string>('');

  constructor(private readonly _launchpadsApiService: LaunchpadsApiService) {}

  async ngOnInit(): Promise<void> {
    this.launchpads$ = this._searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string): Observable<IPaginationPage<ILaunchpad>> => {
        const query: Partial<ILaunchpad> = {};
        if (term?.length) query.name = term;

        const options: IRequestOptions = {};
        return this._launchpadsApiService.getLaunchpads(query, options);
      }),
      map((page) => page.docs)
    );
  }

  search(term: string): void {
    this._searchTerms.next(term);
  }
}
