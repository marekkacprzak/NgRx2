import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEntityData, withEffects } from '@ngrx/data';
import { DefaultDataServiceConfig } from '@ngrx/data';

import { routes } from './app.routes';
import { mockApiInterceptor } from './shared/interceptors/mock-api.interceptor';
import { effectsFeature } from './features/01-effects/store/effects.reducer';
import { EffectsDemoEffects } from './features/01-effects/store/effects.effects';
import { entityFeature } from './features/02-entity/store/entity.reducer';
import { EntityDemoEffects } from './features/02-entity/store/entity.effects';
import { entityMetadata, pluralNames, defaultDataServiceConfig } from './features/07-data/entity-metadata';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideRouter(routes),
    provideStore({
      [effectsFeature.name]: effectsFeature.reducer,
      [entityFeature.name]: entityFeature.reducer,
    }),
    provideEffects(EffectsDemoEffects, EntityDemoEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), name: 'NgRx Classic Demo' }),
    provideRouterStore(),
    provideEntityData({ entityMetadata, pluralNames }, withEffects()),
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
};
