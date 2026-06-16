import {Observable} from 'rxjs';
import { BaseHttp, SimpleModel } from '../base/base-http';

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
