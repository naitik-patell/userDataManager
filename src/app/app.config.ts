import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { provideToastr } from 'ngx-toastr';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { AuthInterceptor } from './user-data-manager/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimationsAsync(),
  provideHttpClient(withInterceptorsFromDi()),
  { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  provideToastr(),
  {
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'warndf' },
  }, 
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
