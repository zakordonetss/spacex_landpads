import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILandpad, IPaginationPage, IRequestOptions } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandpadsApiService {
  private readonly _apiUrl = 'https://api.spacexdata.com/v4/launches/query';
  public get apiUrl(): string {
    return this._apiUrl;
  }

  constructor(private readonly _httpClient: HttpClient) {}

  getLandpads(
    query: Partial<ILandpad>,
    options: IRequestOptions
  ): Observable<IPaginationPage<ILandpad>> {
    const body = { query, options };
    return this._httpClient.post<any>(this._apiUrl, body);
  }
}
