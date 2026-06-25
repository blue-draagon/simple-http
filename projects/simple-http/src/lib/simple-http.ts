import {Observable} from 'rxjs';
import { BaseHttp, SimpleModel } from './base-http';

export class SimpleHttp<Entity> extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public getList(): Observable<Entity[] | null> {
    return this.clean(this.http.get<Entity[]>(
      `${this.host}${this.getService()}${this.getEndpoint()}`,
    ));
  }

  public get(id?: string): Observable<Entity | null> {
    return this.clean(this.http.get<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
    ));
  }

  public post(data: Entity): Observable<Entity | null> {
    return this.clean(this.http.post<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}`,
      data,
    ));
  }

  public put(id: string, data: Entity): Observable<Entity | null> {
    return this.clean(this.http.put<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
      data,
    ));
  }

  public patch(id: string, data: Entity): Observable<Entity | null> {
    return this.clean(this.http.patch<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
      data,
    ));
  }

  public delete(id: string): Observable<Entity | null> {
    return this.clean(this.http.delete<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
    ));
  }
}

export class SimpleHttpList<Entity> extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public getList(): Observable<Entity[] | null> {
    return this.clean(this.http.get<Entity[]>(
      `${this.host}${this.getService()}${this.getEndpoint()}`,
    ));
  }
}

export class SimpleHttpGet<Entity> extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public get(id?: string): Observable<Entity | null> {
    return this.clean(this.http.get<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
    ));
  }
}

export class SimpleHttpPost<Entity> extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public post(data: Entity): Observable<Entity | null> {
    return this.clean(this.http.post<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}`,
      data,
    ));
  }
}

export class SimpleHttpPut<Entity> extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public put(id: string, data: Entity): Observable<Entity | null> {
    return this.clean(this.http.put<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
      data
    ));
  }
}

export class SimpleHttpPatch<Entity> extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public patch(id: string, data: Entity): Observable<Entity | null> {
    return this.clean(this.http.patch<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
      data,
    ));
  }
}

export class SimpleHttpDelete<Entity> extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public delete(id: string): Observable<Entity | null> {
    return this.clean<Entity>(this.http.delete<Entity>(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
    ));
  }
}