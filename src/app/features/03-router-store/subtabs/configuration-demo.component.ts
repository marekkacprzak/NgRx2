import { Component } from '@angular/core';

@Component({
  selector: 'app-router-store-config',
  standalone: true,
  template: `
    <h3>Konfiguracja Router Store</h3>
    <p>Router Store oferuje opcje konfiguracji serializera i typu stanu.</p>

    <h4>RouterState.Minimal vs RouterState.Full</h4>
    <pre><code [textContent]="routerStateCode"></code></pre>

    <h4>Custom Serializer</h4>
    <p>Domyślnie Router Store serializuje cały <code>RouterStateSnapshot</code>,
    co może być duże. Możesz stworzyć własny serializer:</p>
    <pre><code [textContent]="serializerCode"></code></pre>

    <div class="info-box">
      <p><strong>Zalecenie:</strong> Używaj <code>RouterState.Minimal</code>
      (domyślne od NgRx 15+). Przechowuje tylko URL, params i query params —
      wystarczające dla większości przypadków i znacznie lżejsze w DevTools.</p>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    .info-box { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class RouterStoreConfigDemoComponent {
  readonly routerStateCode = `import { provideRouterStore, RouterState } from '@ngrx/router-store';

// Minimal (domyślne) — lekki stan
provideRouterStore({ routerState: RouterState.Minimal })

// Full — pełny RouterStateSnapshot
provideRouterStore({ routerState: RouterState.Full })`;

  readonly serializerCode = `import { RouterStateSerializer } from '@ngrx/router-store';

export interface CustomRouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<CustomRouterState> {
  serialize(routerState: RouterStateSnapshot): CustomRouterState {
    const { url } = routerState;
    let route = routerState.root;
    while (route.firstChild) route = route.firstChild;
    const { params, queryParams } = route;
    return { url, params, queryParams };
  }
}`;
}
