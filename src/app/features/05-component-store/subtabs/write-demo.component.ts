import { Component } from '@angular/core';

@Component({
  selector: 'app-cs-write',
  standalone: true,
  template: `
    <h3>Zapis stanu — setState, patchState, updater</h3>

    <h4>setState()</h4>
    <p>Zastępuje cały stan nowym obiektem.</p>
    <pre><code [textContent]="setStateCode"></code></pre>

    <h4>patchState()</h4>
    <p>Aktualizuje wybrane właściwości stanu (jak Object.assign).</p>
    <pre><code [textContent]="patchStateCode"></code></pre>

    <h4>updater()</h4>
    <p>Tworzy reużywalną funkcję aktualizacji stanu.</p>
    <pre><code [textContent]="updaterCode"></code></pre>

    <div class="info-box">
      <p><strong>Kiedy co stosować?</strong></p>
      <ul>
        <li><code>setState</code> — inicjalizacja lub pełna wymiana stanu</li>
        <li><code>patchState</code> — szybka aktualizacja jednej właściwości</li>
        <li><code>updater</code> — logika aktualizacji z parametrami, wielokrotne użycie</li>
      </ul>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    .info-box { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class CsWriteDemoComponent {
  readonly setStateCode = `// Zastąpienie całego stanu
this.setState({ items: [], initialized: false });

// Z callbackiem (dostęp do poprzedniego stanu)
this.setState(state => ({ ...state, items: [] }));`;

  readonly patchStateCode = `// Aktualizacja wybranej właściwości
this.patchState({ initialized: true });

// Z callbackiem
this.patchState(state => ({
  items: state.items.filter(i => i.quantity > 0)
}));`;

  readonly updaterCode = `// Definicja updater w store
readonly addItem = this.updater((state, item: CartItem) => {
  const existing = state.items.find(i => i.productId === item.productId);
  if (existing) {
    return {
      ...state,
      items: state.items.map(i =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      ),
    };
  }
  return { ...state, items: [...state.items, item] };
});

// Użycie w komponencie
this.cartStore.addItem({ productId: 1, name: 'Laptop', price: 3999, quantity: 1 });`;
}
