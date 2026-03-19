import { Component } from '@angular/core';

@Component({
  selector: 'app-data-install',
  standalone: true,
  template: `
    <h3>Instalacja NgRx Data</h3>
    <p><code>&#64;ngrx/data</code> automatyzuje tworzenie akcji, reducerów i efektów
    dla operacji CRUD na encjach.</p>

    <h4>1. Instalacja</h4>
    <pre><code>pnpm add &#64;ngrx/data</code></pre>
    <p>Wymaga: <code>&#64;ngrx/store</code>, <code>&#64;ngrx/effects</code>, <code>&#64;ngrx/entity</code></p>

    <h4>2. Konfiguracja</h4>
    <pre><code [textContent]="configCode"></code></pre>

    <h4>3. Co automatyzuje NgRx Data?</h4>
    <ul>
      <li>Akcje CRUD (query, add, update, delete) — generowane automatycznie</li>
      <li>Reducer — zarządzanie EntityCollection w store</li>
      <li>Effects — obsługa HTTP automatycznie</li>
      <li>Selektory — gotowe do użycia z EntityCollectionService</li>
    </ul>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class DataInstallDemoComponent {
  readonly configCode = `import { provideEntityData, withEffects } from '@ngrx/data';

// w app.config.ts:
provideEntityData(
  {
    entityMetadata: { Product: {} },
    pluralNames: { Product: 'Products' },
  },
  withEffects()
)`;
}
