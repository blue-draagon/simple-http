import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class SimpleLoading {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public setLoading(loading: boolean) {
    this._loading$.next(loading);
  }
}

export class SimpleMessage {
  private _status$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  get status$(): Observable<number> {
    return this._status$.asObservable();
  }

  public setStatus(statusCode: number) {
    this._status$.next(statusCode);
  }

  private _error$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  get error$(): Observable<string> {
    return this._error$.asObservable();
  }

  public setError(message: string) {
    this._error$.next(message);
  }

  private _success$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  get success$(): Observable<string> {
    return this._success$.asObservable();
  }

  public setSuccess(message: string) {
    this._success$.next(message);
  }

  public reset() {
    this._error$.next('');
    this._success$.next('');
  }
}

export class SimpleBaseService extends SimpleLoading {
  public message: SimpleMessage = new SimpleMessage();

  constructor() {
    super();
  }

  protected clean<Entity>(apiRequest: Observable<Entity>): Observable<Entity | null> {
    this.message.reset();
    this.setLoading(true);

    return apiRequest.pipe(
      catchError((exception: HttpErrorResponse) => {
        if (exception.status !== 0) {
          this.message.setStatus(exception.status);
          this.message.setError(exception.error);
        } else {
          this.message.setError('Oops ! please check your connexion.');
        }
        return of(null);
      }),
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }
}

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

export class SimplePersist<Entity> {
  protected contentKey = '';
  protected expireKey = '';

  private timeoutKey(): string {
    return '_' + this.expireKey;
  }

  protected content: Entity | null = null;
  protected expire = 0;

  private timeout = 0;

  constructor(content_key?: string, expire_key?: string) {
    this.contentKey = content_key ?? '';
    this.expireKey = expire_key ?? '';
  }

  public setKeys(content_key: string, expire_key: string) {
    this.contentKey = content_key;
    this.expireKey = expire_key;
    return this;
  }

  public setValues(content: Entity, expire?: number, persist?: boolean) {
    this.content = content;
    this.expire = expire ?? 0;
    this.timeout = new Date().getTime() + this.expire * 1000;
    if (persist) {
      this.persist();
    }
    return this;
  }

  public persist() {
    localStorage.setItem(this.contentKey, btoa(JSON.stringify(this.content)));
    if (this.expire > 0) {
      localStorage.setItem(this.expireKey, this.expire.toString());
      localStorage.setItem(this.timeoutKey(), this.timeout.toString());
    }
    return this;
  }

  public loadLocal(): Entity | null {
    const content: string | null = localStorage.getItem(this.contentKey);
    const expire: string | null = localStorage.getItem(this.expireKey);
    const timeout: string | null = localStorage.getItem(this.timeoutKey());
    if (content != null) {
      this.content = JSON.parse(atob(content)) as Entity;
    }
    if (expire != null) {
      this.expire = +expire;
    }
    if (timeout != null) {
      this.timeout = +timeout;
    }
    return this.content;
  }

  public hasLocal(): boolean {
    return this.loadLocal() !== null;
  }

  public inDelay(): boolean {
    return Date.now() - this.timeout <= this.expire * 1000;
  }

  public cleanLocal() {
    localStorage.removeItem(this.contentKey);
    localStorage.removeItem(this.expireKey);
    localStorage.removeItem(this.timeoutKey());
    return this;
  }
}

export class SimpleObservable<Entity> {
  init(initial: Entity) {
    this._value$.next(initial);
    return this;
  }

  protected _value$ = new BehaviorSubject<Entity>(undefined!);
  get value$(): Observable<Entity> {
    return this._value$.asObservable();
  }

  public valueChange(value: Entity) {
    this._value$.next(value);
  }
}

export class SimpleListObservable<Entity> {
  protected _items$ = new BehaviorSubject<Entity[]>([]);

  init(initial: Entity[]) {
    this._items$.next(initial);
    return this;
  }

  get items$(): Observable<Entity[]> {
    return this._items$.asObservable();
  }

  public includes(value: Entity): boolean {
    return this._items$.value.includes(value);
  }

  public valueChange(value: Entity[]) {
    this._items$.next(value);
  }

  public addItem(value: Entity) {
    this._items$.next([...this._items$.value, value]);
  }

  public removeItem(value: Entity) {
    this._items$.next(this._items$.value.filter((item) => item !== value));
  }
}
