import { Component } from '@angular/core';

@Component({
  selector: 'app-data-reducer',
  standalone: true,
  template: `
    <h3>Entity Reducer</h3>
    <p>NgRx Data automatycznie generuje reducer dla każdej encji w <code>entityCache</code>.</p>

    <h4>Struktura entityCache w store</h4>
    <pre><code [textContent]="cacheCode"></code></pre>

    <h4>Operacje reducera</h4>
    <table>
      <tr><th>Akcja Success</th><th>Operacja na kolekcji</th></tr>
      <tr><td>query-all/success</td><td><code>addAll</code> — zastępuje całą kolekcję</td></tr>
      <tr><td>save/add-one/success</td><td><code>addOne</code> — dodaje encję</td></tr>
      <tr><td>save/update-one/success</td><td><code>updateOne</code> — aktualizuje encję</td></tr>
      <tr><td>save/delete-one/success</td><td><code>removeOne</code> — usuwa encję</td></tr>
    </table>

    <div class="info-box">
      <p><strong>Redux DevTools:</strong> Otwórz Redux DevTools i obserwuj klucz
      <code>entityCache.Product</code> — zobaczysz wszystkie auto-generowane
      akcje i zmiany stanu kolekcji.</p>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    .info-box { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class DataEntityReducerDemoComponent {
  readonly cacheCode = `// Stan w Redux DevTools:
{
  effectsDemo: { ... },       // ręczny feature state
  entityDemo: { ... },        // ręczny feature state
  entityCache: {              // ← NgRx Data
    Product: {
      ids: [1, 2, 3],
      entities: {
        1: { id: 1, name: 'Laptop', price: 3999, category: 'Elektronika' },
        2: { id: 2, name: 'Klawiatura', price: 299, category: 'Elektronika' },
        ...
      },
      loaded: true,
      loading: false,
      filter: '',
      changeState: {},
      entityName: 'Product',
    }
  }
}`;
}
