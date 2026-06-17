import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimpleHttp } from './simple-http';
import { SimpleHttpList } from './simple-http-list';
import { SimpleHttpGet } from './simple-http-get';
import { SimpleHttpDelete } from './simple-http-delete';
import { SimpleHttpPatch } from './simple-http-patch';
import { SimpleHttpPut } from './simple-http-put';
import { SimpleHttpPost } from './simple-http-post';

const API_HOST = '';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private http: HttpClient = inject(HttpClient);
  private service = '/the-service';

  entity: SimpleHttp<Entity> = new SimpleHttp<Entity>({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  getAll: SimpleHttpList<Entity> = new SimpleHttpList<Entity>({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  get: SimpleHttpGet<Entity> = new SimpleHttpGet<Entity>({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  post: SimpleHttpPost<Entity> = new SimpleHttpPost<Entity>({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  put: SimpleHttpPut<Entity> = new SimpleHttpPut<Entity>({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  patch: SimpleHttpPatch<Entity> = new SimpleHttpPatch<Entity>({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  delete: SimpleHttpDelete<Entity> = new SimpleHttpDelete<Entity>({
    http: this.http,
    host: API_HOST,
    service: this.service,
    endpoint: 'entities'
  });

  // ------------------------------------------
}

interface Entity {
  id: number,
  title: string
}
