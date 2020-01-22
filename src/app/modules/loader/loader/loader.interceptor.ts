import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    const isRequestInQueue = (this.requests.length > 0);
    if (this.loaderService.ISAUTOMODE) {
      isRequestInQueue ? this.loaderService.show() : this.loaderService.hide();
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    if (this.loaderService.ISAUTOMODE) {
      this.loaderService.show();
    }
    // create a new observable which we return instead of the original
    return new Observable(observer => {
      // subscribe to the original observable to ensure the HttpRequest is made
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
