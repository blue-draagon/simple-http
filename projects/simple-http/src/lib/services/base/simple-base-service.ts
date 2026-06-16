import { SimpleMessage } from './simple-message';
import { SimpleLoading } from './simple-loading';
import { catchError, finalize, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
          this.message.setError('Oops ! please check your connexion.')
        }
        return of(null);
      }),
      finalize(() => {
        this.setLoading(false);
      })
    );
  }
}
