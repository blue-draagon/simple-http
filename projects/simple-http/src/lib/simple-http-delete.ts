import { Observable } from 'rxjs';
import { BaseHttp, SimpleModel } from './base-http';

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
