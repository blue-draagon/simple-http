import {Observable} from 'rxjs';
import { BaseHttp, SimpleModel } from '../base/base-http';

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
