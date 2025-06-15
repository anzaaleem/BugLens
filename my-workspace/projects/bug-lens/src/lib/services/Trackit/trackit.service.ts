import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
export interface IErrorLog {
  message:     string;   // human-friendly message
  stack_trace: string;   // minimized stack or HTTP summary
  route:       string;   // e.g. "/test-error"
  user_agent:  string;   // browser UA
  referer:     string;   // document.referrer
  method:      string;   // HTTP verb ("GET"/"POST") or "CLIENT"
  status:      number;   // HTTP status code, or 0 for runtime
  timestamp:   string;   // ISO timestamp
}

@Injectable({ providedIn: 'root' })
export class TrackitService {
 // private apiEndpoint = environment.trackerApi; // http://localhost:3000/log-error
  private buildTrackItURL: string = '/log-error';

  constructor(private http: HttpClient) {}
set environmentApiUrl(trackitBackend: string) {
    this.buildTrackItURL = trackitBackend + this.buildTrackItURL;
  }
  public trackError(error: Error | HttpErrorResponse, route: string): void {
    const isHttp = error instanceof HttpErrorResponse;
    const httpErr = error as HttpErrorResponse & { httpMethod?: string };

    // 1) Build a minimized stack_trace
    let stack = '';
    if (isHttp) {
      // If backend returned JSON, use its message; else just the status/message
      stack = JSON.stringify({
        status:     httpErr.status,
        statusText: httpErr.statusText,
        url:        httpErr.url,
        message:    httpErr.error?.message ?? httpErr.message
      });
    } else {
      // JS runtime: only first 3 lines
      const raw = (error as Error).stack || '';
      stack = raw.split('\n').slice(0, 3).join('\n');
    }

    // 2) Assemble full payload
    const payload: IErrorLog = {
      message:     this.getErrorMessage(error),
      stack_trace: stack,
      route,
      user_agent:  navigator.userAgent,
      referer:     document.referrer || '',

      // method: from interceptor (GET/POST) or "CLIENT"
      method: isHttp
        ? httpErr.httpMethod || 'UNKNOWN'
        : 'CLIENT',

      // status: actual HTTP status or 0 for runtime
      status: isHttp ? httpErr.status : 0,

      timestamp:   new Date().toISOString(),
    };

    console.log('TrackitService payload:', payload);

    // 3) Send to backend
    this.http.post(this.buildTrackItURL, payload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
      .subscribe({
        next: () => console.log('TrackerService: log sent'),
        error: e => console.error('TrackerService: send failed', e)
      });
  }

  private getErrorMessage(err: any): string {
    if (err instanceof Error)               return err.message;
    if (err instanceof HttpErrorResponse)    return err.error?.message || err.message;
    return 'Unknown error';
  }
}
