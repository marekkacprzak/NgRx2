import { Component } from '@angular/core';

@Component({
  selector: 'app-router-store-install',
  standalone: true,
  template: `
    <h3>Instalacja Router Store</h3>
    <p>NgRx Router Store łączy Angular Router ze store NgRx,
    synchronizując stan nawigacji jako akcje i stan w store.</p>

    <h4>1. Instalacja</h4>
    <pre><code>pnpm add &#64;ngrx/router-store</code></pre>

    <h4>2. Rejestracja w app.config.ts</h4>
    <pre><code [textContent]="configCode"></code></pre>

    <h4>3. Co daje Router Store?</h4>
    <ul>
      <li>Nawigacja routera jest dispatchowana jako akcje NgRx</li>
      <li>Stan routera jest przechowywany w store</li>
      <li>Możliwość tworzenia selektorów na stan routera</li>
      <li>Time-travel debugging nawigacji w Redux DevTools</li>
    </ul>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class RouterStoreInstallDemoComponent {
  readonly configCode = `import { provideRouterStore } from '@ngrx/router-store';

// w app.config.ts providers:
provideRouterStore()`;
}
