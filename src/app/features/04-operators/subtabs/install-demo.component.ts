import { Component } from '@angular/core';

@Component({
  selector: 'app-operators-install',
  standalone: true,
  template: `
    <h3>Instalacja NgRx Operators</h3>
    <p>Pakiet <code>&#64;ngrx/operators</code> dostarcza operatory RxJS
    zaprojektowane do pracy z NgRx Effects i Component Store.</p>

    <h4>1. Instalacja</h4>
    <pre><code>pnpm add &#64;ngrx/operators</code></pre>

    <h4>2. Dostępne operatory</h4>
    <table>
      <tr><th>Operator</th><th>Opis</th></tr>
      <tr>
        <td><code>tapResponse</code></td>
        <td>Bezpieczna obsługa sukcesu i błędu w efektach — nie kończy strumienia przy błędzie</td>
      </tr>
      <tr>
        <td><code>mapResponse</code></td>
        <td>Mapowanie odpowiedzi z obsługą błędów — jak tapResponse, ale emituje nową wartość</td>
      </tr>
    </table>

    <div class="info-box">
      <p><strong>Dlaczego tapResponse?</strong> Standardowy <code>catchError</code> w efekcie
      może przypadkowo zakończyć strumień efektu. <code>tapResponse</code> zapewnia, że
      strumień pozostaje aktywny nawet po błędzie.</p>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    .info-box { background: #fff3e0; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class OperatorsInstallDemoComponent {}
