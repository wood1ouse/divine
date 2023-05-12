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
import { createClient } from '@supabase/supabase-js';
import { Database } from '@models/database';
import { environment } from '../../environments/environment';

export class TrelloInterceptor implements HttpInterceptor {
  private supabase = createClient<Database>(
    environment['SUPABASE_URL'],
    environment['SUPABASE_KEY']
  );

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
