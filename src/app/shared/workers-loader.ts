import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyWorker } from './worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkersLoaderService {

  roteApi = 'http://localhost:3000/workers';

  constructor(
    private http: HttpClient
  ) { }

  getWorker(): Promise<any> {
    return this.http.get(this.roteApi).toPromise();
  }

  postWorker(data: MyWorker) {
    return this.http.post(this.roteApi, data).toPromise();
  }

  deleteWorker(id: number) {
    return this.http.delete(this.roteApi + '/' + id).toPromise();
  }

  editWorker(id: number, data: MyWorker) {
    return this.http.put(this.roteApi + '/' + id, data).toPromise();
  }
}
