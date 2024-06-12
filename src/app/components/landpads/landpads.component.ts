import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ILandpad, IPaginationPage, IRequestOptions } from '@models';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { LandpadsApiService } from 'src/app/services/landpads/landpads-api.service';

@Component({
  selector: 'app-landpads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landpads.component.html',
  styleUrl: './landpads.component.sass',
})
export class LandpadsComponent implements OnInit {
  public landpads$: Observable<ILandpad[]>;

  private readonly _searchTerms = new BehaviorSubject<string>('');

  constructor(private readonly _landpadsApiService: LandpadsApiService) {}

  async ngOnInit(): Promise<void> {
    this.landpads$ = this._searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string): Observable<IPaginationPage<ILandpad>> => {
        const query: Partial<ILandpad> = {};
        if (term?.length) query.name = term;

        const options: IRequestOptions = { limit: 2 };
        return this._landpadsApiService.getLandpads(query, options);
      }),
      map((page) => page.docs)
    );
  }

  search(term: string): void {
    this._searchTerms.next(term);
  }
}
