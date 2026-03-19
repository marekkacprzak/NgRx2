import { Component } from '@angular/core';

@Component({
  selector: 'app-data-metadata',
  standalone: true,
  template: `
    <h3>Entity Metadata</h3>
    <p>Metadata definiuje konfigurację encji dla NgRx Data.</p>

    <h4>Podstawowa definicja</h4>
    <pre><code [textContent]="basicCode"></code></pre>

    <h4>Zaawansowane opcje</h4>
    <pre><code [textContent]="advancedCode"></code></pre>

    <h4>Opcje EntityMetadata</h4>
    <table>
      <tr><th>Opcja</th><th>Opis</th></tr>
      <tr><td><code>entityName</code></td><td>Nazwa encji (klucz w mapie)</td></tr>
      <tr><td><code>sortComparer</code></td><td>Funkcja sortowania kolekcji</td></tr>
      <tr><td><code>selectId</code></td><td>Custom selektor ID (domyślnie: entity.id)</td></tr>
      <tr><td><code>filterFn</code></td><td>Funkcja filtrowania kolekcji</td></tr>
      <tr><td><code>additionalCollectionState</code></td><td>Dodatkowe pola w EntityCollection</td></tr>
    </table>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
  `,
})
export class DataEntityMetadataDemoComponent {
  readonly basicCode = `const entityMetadata: EntityMetadataMap = {
  Product: {},        // domyślna konfiguracja
  User: {},
  Order: {},
};

const pluralNames = {
  Product: 'Products',  // NgRx Data buduje URL: /api/products
};`;

  readonly advancedCode = `const entityMetadata: EntityMetadataMap = {
  Product: {
    sortComparer: (a, b) => a.name.localeCompare(b.name),
    selectId: (product) => product.id,
    filterFn: (entities, pattern) =>
      entities.filter(e =>
        e.name.toLowerCase().includes(pattern.toLowerCase())
      ),
  },
};`;
}
