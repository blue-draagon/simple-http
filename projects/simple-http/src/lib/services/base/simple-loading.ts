import {BehaviorSubject, Observable} from 'rxjs';

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
