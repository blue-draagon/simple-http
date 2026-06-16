import {Observable} from 'rxjs';
import { BaseHttp, SimpleModel } from '../base/base-http';

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
