import { HttpClient } from '@angular/common/http';
import { SimpleBaseService } from './simple-base-service';

export class BaseHttp extends SimpleBaseService {
  protected http!: HttpClient;
  protected host = '';
  protected service = '';
  protected endpoint = '';

  constructor() {
    super();
  }

  public setHttp(http: HttpClient) {
    this.http = http;
  }

  public setHost(host: string) {
    this.host = host;
  }

  public setService(service: string) {
    this.service = service;
  }

  public setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected slash(value: string | undefined): string {
    if (value && value !== '') {
      return '/' + value;
    }
    return '';
  }

  protected getService(): string {
    return this.slash(this.service);
  }

  protected getEndpoint(): string {
    return this.slash(this.endpoint);
  }

  protected init(params: SimpleModel) {
    this.setHttp(params.http);
    this.setHost(params.host);
    this.setService(params.service ?? '');
    this.setEndpoint(params.endpoint ?? '');
  }
}

export interface SimpleModel {
  http: HttpClient;
  host: string;
  service?: string;
  endpoint?: string;
}
