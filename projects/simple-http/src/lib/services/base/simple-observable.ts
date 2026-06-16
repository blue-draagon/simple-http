import {BehaviorSubject, Observable} from "rxjs";

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
