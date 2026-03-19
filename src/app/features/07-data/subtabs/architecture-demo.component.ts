import { Component } from '@angular/core';

@Component({
  selector: 'app-data-architecture',
  standalone: true,
  template: `
    <h3>Architektura NgRx Data</h3>

    <div class="architecture">
      <pre>{{ architectureDiagram }}</pre>
    </div>

    <h4>Warstwy</h4>
    <table>
      <tr><th>Warstwa</th><th>Odpowiedzialność</th></tr>
      <tr>
        <td><code>EntityCollectionService</code></td>
        <td>API dla komponentu — metody CRUD, selektory</td>
      </tr>
      <tr>
        <td><code>EntityDispatcher</code></td>
        <td>Dispatchuje akcje do store</td>
      </tr>
      <tr>
        <td><code>EntityEffects</code></td>
        <td>Nasłuchuje akcji i wywołuje DataService</td>
      </tr>
      <tr>
        <td><code>DefaultDataService</code></td>
        <td>Wykonuje HTTP requests (GET, POST, PUT, DELETE)</td>
      </tr>
      <tr>
        <td><code>EntityReducer</code></td>
        <td>Aktualizuje EntityCollection w store</td>
      </tr>
    </table>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .architecture { background: #263238; padding: 16px; border-radius: 8px; margin: 16px 0; }
    .architecture pre { color: #aed581; margin: 0; font-size: 0.85em; white-space: pre; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
  `,
})
export class DataArchitectureDemoComponent {
  readonly architectureDiagram = `
  Komponent
      │
      ▼
  EntityCollectionService  ◄── select (entities$, loaded$, loading$)
      │
      ▼
  EntityDispatcher ──► Store (EntityCollection)
      │                     ▲
      ▼                     │
  EntityActions ──────► EntityReducer
      │
      ▼
  EntityEffects
      │
      ▼
  DefaultDataService ──► HTTP (GET /api/products)
  `;
}
