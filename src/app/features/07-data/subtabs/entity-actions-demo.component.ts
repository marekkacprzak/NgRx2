import { Component } from '@angular/core';

@Component({
  selector: 'app-data-actions',
  standalone: true,
  template: `
    <h3>Entity Actions</h3>
    <p>NgRx Data automatycznie generuje akcje dla każdej zarejestrowanej encji.</p>

    <h4>Auto-generowane akcje</h4>
    <table>
      <tr><th>Operacja</th><th>Akcja</th><th>Success</th></tr>
      <tr><td>Query (GET all)</td><td>[Product] query-all</td><td>[Product] query-all/success</td></tr>
      <tr><td>Query by key</td><td>[Product] query-by-key</td><td>[Product] query-by-key/success</td></tr>
      <tr><td>Add (POST)</td><td>[Product] save/add-one</td><td>[Product] save/add-one/success</td></tr>
      <tr><td>Update (PUT)</td><td>[Product] save/update-one</td><td>[Product] save/update-one/success</td></tr>
      <tr><td>Delete (DELETE)</td><td>[Product] save/delete-one</td><td>[Product] save/delete-one/success</td></tr>
    </table>

    <div class="info-box">
      <p><strong>Optymistyczne vs pesymistyczne zapisy:</strong></p>
      <ul>
        <li><strong>Optymistyczne</strong> — aktualizuj store natychmiast, cofnij przy błędzie</li>
        <li><strong>Pesymistyczne</strong> (domyślne) — czekaj na odpowiedź serwera</li>
      </ul>
      <p>Konfiguracja: <code>entityDispatcherOptions</code> w metadata.</p>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    .info-box { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class DataEntityActionsDemoComponent {}
