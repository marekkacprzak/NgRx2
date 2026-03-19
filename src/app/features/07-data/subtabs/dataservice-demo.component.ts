import { Component } from '@angular/core';

@Component({
  selector: 'app-data-dataservice',
  standalone: true,
  template: `
    <h3>Custom DataService</h3>
    <p>Domyślnie NgRx Data używa <code>DefaultDataService</code> do HTTP.
    Możesz go nadpisać dla custom logiki.</p>

    <h4>DefaultDataService</h4>
    <pre><code [textContent]="defaultCode"></code></pre>

    <h4>Custom DataService</h4>
    <pre><code [textContent]="customCode"></code></pre>

    <h4>Rejestracja</h4>
    <pre><code [textContent]="registerCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class DataDataserviceDemoComponent {
  readonly defaultCode = `// DefaultDataService automatycznie:
// GET    /api/products      → getAll()
// GET    /api/products/:id  → getById(id)
// POST   /api/products      → add(entity)
// PUT    /api/products/:id  → update(entity)
// DELETE /api/products/:id  → delete(id)`;

  readonly customCode = `@Injectable()
export class ProductDataService extends DefaultDataService<Product> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Product', http, httpUrlGenerator);
  }

  override getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products').pipe(
      map(products => products.filter(p => p.price > 0))
    );
  }
}`;

  readonly registerCode = `// W app.config.ts lub module:
{
  provide: DefaultDataServiceConfig,
  useValue: { root: '/api' }
}

// Lub rejestracja custom service:
providers: [
  { provide: ProductDataService, useClass: ProductDataService }
]`;
}
