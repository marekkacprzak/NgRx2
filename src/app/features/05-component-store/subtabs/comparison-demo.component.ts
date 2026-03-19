import { Component } from '@angular/core';

@Component({
  selector: 'app-cs-comparison',
  standalone: true,
  template: `
    <h3>Component Store vs Global Store</h3>

    <table>
      <tr>
        <th>Aspekt</th>
        <th>Global Store</th>
        <th>Component Store</th>
      </tr>
      <tr>
        <td>Zasięg</td>
        <td>Cała aplikacja (singleton)</td>
        <td>Pojedynczy komponent (i dzieci)</td>
      </tr>
      <tr>
        <td>Cykl życia</td>
        <td>Od startu do końca aplikacji</td>
        <td>Tworzony/niszczony z komponentem</td>
      </tr>
      <tr>
        <td>Boilerplate</td>
        <td>Actions + Reducer + Effects + Selectors</td>
        <td>select() + updater() + effect()</td>
      </tr>
      <tr>
        <td>Redux DevTools</td>
        <td>Pełna integracja</td>
        <td>Brak (wymaga ręcznego logowania)</td>
      </tr>
      <tr>
        <td>Testowanie</td>
        <td>Marble testing (effects), unit (reducers)</td>
        <td>Standardowe unit testy</td>
      </tr>
      <tr>
        <td>Wiele instancji</td>
        <td>Nie (singleton)</td>
        <td>Tak (każdy komponent ma własną)</td>
      </tr>
      <tr>
        <td>Idealny dla</td>
        <td>Stan współdzielony, logika biznesowa</td>
        <td>Stan UI, formularze, lokalne kolekcje</td>
      </tr>
    </table>

    <div class="info-box">
      <p><strong>Kiedy Component Store?</strong></p>
      <ul>
        <li>Stan nie jest potrzebny po opuszczeniu strony</li>
        <li>Wiele instancji tego samego komponentu (np. lista kart produktów)</li>
        <li>Chcesz uniknąć boilerplate Actions/Reducer</li>
        <li>Stan jest ściśle powiązany z jednym komponentem</li>
      </ul>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
    th { background: #1976d2; color: white; }
    tr:nth-child(even) { background: #f5f5f5; }
    .info-box { background: #e8f5e9; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class CsComparisonDemoComponent {}
