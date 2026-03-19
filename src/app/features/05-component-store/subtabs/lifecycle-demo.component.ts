import { Component } from '@angular/core';

@Component({
  selector: 'app-cs-lifecycle',
  standalone: true,
  template: `
    <h3>Cykl życia Component Store</h3>

    <h4>OnStoreInit</h4>
    <p>Wywoływany gdy store jest zainicjalizowany (po utworzeniu instancji).</p>
    <pre><code [textContent]="onStoreInitCode"></code></pre>

    <h4>OnStateInit</h4>
    <p>Wywoływany gdy stan jest po raz pierwszy ustawiony (setState/patchState).</p>
    <pre><code [textContent]="onStateInitCode"></code></pre>

    <div class="demo-section">
      <h4>Live Demo</h4>
      <p>Otwórz konsolę (F12) — zobaczysz logi:</p>
      <ul>
        <li><code>[CartStore] OnStoreInit</code> — po utworzeniu store</li>
        <li><code>[CartStore] OnStateInit</code> — po pierwszym ustawieniu stanu</li>
      </ul>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    .demo-section { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class CsLifecycleDemoComponent {
  readonly onStoreInitCode = `@Injectable()
export class CartStore extends ComponentStore<CartState>
  implements OnStoreInit {
  ngrxOnStoreInit(): void {
    console.log('Store utworzony');
    // np. załaduj dane początkowe
  }
}`;

  readonly onStateInitCode = `@Injectable()
export class CartStore extends ComponentStore<CartState>
  implements OnStateInit {
  ngrxOnStateInit(): void {
    console.log('Stan zainicjalizowany');
    // np. uruchom efekt ładowania
    this.loadProducts();
  }
}`;
}
