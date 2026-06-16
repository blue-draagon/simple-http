import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimpleHttp } from './request/simple-http';
import { SimpleHttpList } from './request/simple-http-list';
import { SimpleHttpGet } from './request/simple-http-get';
import { SimpleHttpDelete } from './request/simple-http-delete';
import { SimpleHttpPatch } from './request/simple-http-patch';
import { SimpleHttpPut } from './request/simple-http-put';
import { SimpleHttpPost } from './request/simple-http-post';

const API_HOST = '';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private http: HttpClient = inject(HttpClient);
  private service: string = '/the-service';

  entity: SimpleHttp<Entity> = new SimpleHttp({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  getAll: SimpleHttpList<Entity> = new SimpleHttpList({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  get: SimpleHttpGet<Entity> = new SimpleHttpGet({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  post: SimpleHttpPost<Entity> = new SimpleHttpPost({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  put: SimpleHttpPut<Entity> = new SimpleHttpPut({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  patch: SimpleHttpPatch<Entity> = new SimpleHttpPatch({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  delete: SimpleHttpDelete = new SimpleHttpDelete({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  // ------------------------------------------
}

interface Entity {
}
