import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  selectUrl,
  selectRouteParams,
  selectQueryParams,
  selectCurrentRoute,
} from '../store/router.selectors';

@Component({
  selector: 'app-router-store-selectors',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <h3>Router Store Selectors</h3>
    <p>NgRx Router Store dostarcza gotowe selektory do odczytu stanu routera.</p>

    <div class="demo-section">
      <h4>Aktualny stan routera</h4>
      <table>
        <tr>
          <td><strong>selectUrl</strong></td>
          <td><code>{{ url$ | async }}</code></td>
        </tr>
        <tr>
          <td><strong>selectRouteParams</strong></td>
          <td><code>{{ routeParams$ | async | json }}</code></td>
        </tr>
        <tr>
          <td><strong>selectQueryParams</strong></td>
          <td><code>{{ queryParams$ | async | json }}</code></td>
        </tr>
      </table>

      <p class="hint">Użyj zakładki "Actions" aby nawigować i zobaczyć zmiany selektorów.</p>
    </div>

    <h4>Dostępne selektory</h4>
    <pre><code [textContent]="selectorsCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px; border-bottom: 1px solid #eee; }
    .hint { color: #666; font-style: italic; margin-top: 12px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class RouterStoreSelectorsDemoComponent {
  private readonly store = inject(Store);

  readonly url$ = this.store.select(selectUrl);
  readonly routeParams$ = this.store.select(selectRouteParams);
  readonly queryParams$ = this.store.select(selectQueryParams);

  readonly selectorsCode = `import { getRouterSelectors } from '@ngrx/router-store';

const {
  selectCurrentRoute,   // aktywna trasa
  selectUrl,            // pełny URL
  selectRouteParams,    // parametry trasy (np. :id)
  selectQueryParams,    // parametry query (?search=...)
  selectRouteData,      // dane trasy (z definicji routy)
  selectTitle,          // tytuł strony
} = getRouterSelectors();`;
}
