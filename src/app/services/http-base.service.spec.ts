import { environment } from './../../environments/environment.prod';
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpBaseService } from './http-base.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

class DummyModel {
  id: number;
  name: string;
}

@Injectable()
export class DummyService extends HttpBaseService {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'people');
    }
  }

  describe('HttpBaseService', () => {
    const di = [DummyService, HttpTestingController];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          HttpClientTestingModule
        ],
        providers: [DummyService]
      });
    });

    it('Should mount the correct endpoint', async(
      inject([DummyService, HttpTestingController], (serviceDummy: DummyService, httpClient: HttpTestingController) => {
        expect(serviceDummy.endpoint).toEqual(`${environment.apiUrl}people/`);
      })));

    it('Should fire a getSingle request', async(
      inject([DummyService, HttpTestingController], (serviceDummy: DummyService, httpClient: HttpTestingController) => {
        const id = 15;
        serviceDummy.getSingle<DummyModel>(id).subscribe();

        httpClient.expectOne({
          url: `${environment.apiUrl}people/${id}`,
          method: 'GET'
        });
      })));

    it('Should fire a getAll request', async(
      inject([DummyService, HttpTestingController], (serviceDummy: DummyService, httpClient: HttpTestingController) => {

        serviceDummy.getAll<DummyModel>().subscribe();

        httpClient.expectOne({
          url: `${environment.apiUrl}people/`,
          method: 'GET'
        });
      })));

      it('Should test getSubchildArray() with the father url returning an array of URLs', async(
        inject([DummyService, HttpTestingController], (serviceDummy: DummyService, httpClient: HttpTestingController) => {
          const fatherObject = { resources: [
            'https://testing-subchild-resources.com'
          ]};
          serviceDummy.getSubchildArray<any>(fatherObject, 'resources')
            .subscribe((resposta) => {
              expect(resposta).toBeTruthy();
              expect(resposta).toEqual(['works']);
            });

          httpClient.match({
            url: 'https://testing-subchild-resources.com',
            method: 'GET'
          })[0].flush('works');
        })));

        afterEach(inject([HttpTestingController], (httpClient: HttpTestingController) => {
          httpClient.verify();
        }));
      });
