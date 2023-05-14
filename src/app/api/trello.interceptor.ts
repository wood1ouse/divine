import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SERVICE_TOKEN,
  Services,
  trelloPrefix,
  trelloServiceUrl,
} from './endpoints';

export class TrelloInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const service: Services = req.context.get(SERVICE_TOKEN);
    let url = '';
    if (/http/.test(req.url)) url = req.url;

    if (service === Services.TRELLO) {
      url = trelloServiceUrl + trelloPrefix + req.url;
    }

    const cloned = req.clone({ url });
    return next.handle(cloned);
  }
}
