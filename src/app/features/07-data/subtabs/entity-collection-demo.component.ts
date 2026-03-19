import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductCollectionService } from '../product-collection.service';

@Component({
  selector: 'app-data-collection',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>Entity Collection</h3>
    <p>Każda encja w NgRx Data ma swoją <code>EntityCollection</code> w store.</p>

    <div class="demo-section">
      <h4>Stan kolekcji Product</h4>
      <button (click)="load()">Załaduj produkty</button>

      <table>
        <tr><td><strong>loaded</strong></td><td>{{ products.loaded$ | async }}</td></tr>
        <tr><td><strong>loading</strong></td><td>{{ products.loading$ | async }}</td></tr>
        <tr><td><strong>count</strong></td><td>{{ products.count$ | async }}</td></tr>
      </table>
    </div>

    <h4>Kształt EntityCollection</h4>
    <pre><code [textContent]="collectionCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    button { padding: 8px 16px; cursor: pointer; background: #1976d2; color: white; border: none; border-radius: 4px; margin-bottom: 12px; }
    button:hover { background: #1565c0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px; border-bottom: 1px solid #eee; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class DataEntityCollectionDemoComponent {
  readonly products = inject(ProductCollectionService);

  readonly collectionCode = `interface EntityCollection<T> {
  ids: (string | number)[];
  entities: Dictionary<T>;
  loaded: boolean;
  loading: boolean;
  filter: string;
  changeState: ChangeStateMap<T>;
  entityName: string;
}`;

  load(): void {
    this.products.getAll();
  }
}
