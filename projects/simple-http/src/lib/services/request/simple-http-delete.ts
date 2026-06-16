import { BaseHttp, SimpleModel } from '../base/base-http';

export class SimpleHttpDelete extends BaseHttp {

  constructor(config: SimpleModel) {
    super();
    this.init(config);
  }

  public delete(id: string) {
    return this.clean(this.http.delete(
      `${this.host}${this.getService()}${this.getEndpoint()}${this.slash(id)}`,
    ));
  }
}
