import { ResponseHttpApi } from './../films/models/response';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export class HttpBaseService {

  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private path: string,
  ) {}

    get endpoint() {
      return `${this.baseUrl}${this.path}/`;
    }

    getAll<T>(): Observable<ResponseHttpApi<T>> {
      return this.httpClient.get<ResponseHttpApi<T>>(this.endpoint);
    }

    getSingle<T>(id: number) {
      return this.httpClient.get<T>(`${this.endpoint}${id}`);
    }

    getSubchildArray<T>(fatherObject, subchildAtributte): Observable<T[]> {
      return forkJoin(fatherObject[subchildAtributte].map(url => this.httpClient.get<T>(url).pipe(delay(300))));
    }
  }
