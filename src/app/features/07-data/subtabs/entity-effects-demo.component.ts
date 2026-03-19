import { Component } from '@angular/core';

@Component({
  selector: 'app-data-effects',
  standalone: true,
  template: `
    <h3>Entity Effects</h3>
    <p>NgRx Data automatycznie obsługuje side effects HTTP dla wszystkich operacji CRUD.</p>

    <h4>Jak działają Entity Effects?</h4>
    <pre><code [textContent]="flowCode"></code></pre>

    <h4>Automatyczne efekty</h4>
    <table>
      <tr><th>Metoda</th><th>Akcja</th><th>HTTP</th></tr>
      <tr><td><code>getAll()</code></td><td>query-all</td><td>GET /api/products</td></tr>
      <tr><td><code>getByKey(id)</code></td><td>query-by-key</td><td>GET /api/products/id</td></tr>
      <tr><td><code>add(entity)</code></td><td>save/add-one</td><td>POST /api/products</td></tr>
      <tr><td><code>update(entity)</code></td><td>save/update-one</td><td>PUT /api/products/id</td></tr>
      <tr><td><code>delete(entity)</code></td><td>save/delete-one</td><td>DELETE /api/products/id</td></tr>
    </table>

    <div class="info-box">
      <p><strong>Zero kodu efektów!</strong> W przeciwieństwie do ręcznych <code>&#64;ngrx/effects</code>,
      nie musisz pisać żadnego kodu efektów. NgRx Data robi to za Ciebie.</p>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    .info-box { background: #e8f5e9; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class DataEntityEffectsDemoComponent {
  readonly flowCode = `// Przepływ automatyczny:
// 1. Komponent wywołuje: productService.getAll()
// 2. EntityDispatcher dispatchuje: [Product] query-all
// 3. EntityEffects nasłuchuje i wywołuje DataService.getAll()
// 4. DataService wykonuje: GET /api/products
// 5. Po sukcesie: [Product] query-all/success
// 6. EntityReducer aktualizuje EntityCollection w store
// 7. Komponent automatycznie otrzymuje dane przez entities$`;
}
