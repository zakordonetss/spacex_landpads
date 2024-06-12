import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILaunchpad, IPaginationPage, IRequestOptions } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaunchpadsApiService {
  private readonly _apiUrl = 'https://api.spacexdata.com/v4/launchpads/query';
  public get apiUrl(): string {
    return this._apiUrl;
  }

  constructor(private readonly _httpClient: HttpClient) {}

  getLaunchpads(
    query: Partial<ILaunchpad>,
    options: IRequestOptions
  ): Observable<IPaginationPage<ILaunchpad>> {
    const body = { query, options };
    return this._httpClient.post<any>(this._apiUrl, body);
  }
}
