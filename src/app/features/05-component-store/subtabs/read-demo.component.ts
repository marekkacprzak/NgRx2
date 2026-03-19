import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartStore } from '../store/cart.store';

@Component({
  selector: 'app-cs-read',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  template: `
    <h3>Odczyt stanu — select()</h3>
    <p><code>select()</code> tworzy Observable z wybraną częścią stanu.</p>

    <div class="demo-section">
      <h4>Aktualne selektory koszyka</h4>
      <table>
        <tr><td>items$</td><td>{{ (items$ | async)?.length ?? 0 }} produktów</td></tr>
        <tr><td>totalItems$</td><td>{{ totalItems$ | async }} sztuk</td></tr>
        <tr><td>totalPrice$</td><td>{{ totalPrice$ | async | currency: 'PLN' : 'symbol' : '1.2-2' : 'pl' }}</td></tr>
        <tr><td>initialized$</td><td>{{ initialized$ | async }}</td></tr>
      </table>
      <p class="hint">Przejdź do zakładki "Użycie" aby dodać produkty do koszyka.</p>
    </div>

    <h4>Przykłady select()</h4>
    <pre><code [textContent]="selectCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px; border-bottom: 1px solid #eee; }
    td:first-child { font-weight: bold; font-family: monospace; }
    .hint { color: #666; font-style: italic; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class CsReadDemoComponent {
  private readonly store = inject(CartStore);

  readonly items$ = this.store.items$;
  readonly totalItems$ = this.store.totalItems$;
  readonly totalPrice$ = this.store.totalPrice$;
  readonly initialized$ = this.store.initialized$;

  readonly selectCode = `// Prosty selektor
readonly items$ = this.select(state => state.items);

// Selektor z projekcją
readonly totalPrice$ = this.select(state =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Selektor złożony z innych selektorów
readonly cartSummary$ = this.select(
  this.items$,
  this.totalPrice$,
  (items, total) => ({ count: items.length, total })
);`;
}
