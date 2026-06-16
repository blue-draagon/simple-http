import { BehaviorSubject, Observable } from 'rxjs';

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
