import {Observable} from 'rxjs';
import { BaseHttp, SimpleModel } from '../base/base-http';

export class SimpleHttpDelete extends BaseHttp<any> {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public delete(id: string): Observable<any> {
    return this.clean(this.http.delete(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
    ));
  }
}
