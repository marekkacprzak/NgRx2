import { Component } from '@angular/core';

@Component({
  selector: 'app-cs-install',
  standalone: true,
  template: `
    <h3>Instalacja Component Store</h3>
    <p>Component Store to lekki, samodzielny kontener stanu dla komponentów.</p>

    <h4>1. Instalacja</h4>
    <pre><code>pnpm add &#64;ngrx/component-store</code></pre>

    <h4>2. Kluczowe różnice vs global Store</h4>
    <table>
      <tr><th>Cecha</th><th>Global Store</th><th>Component Store</th></tr>
      <tr><td>Zasięg</td><td>Globalny (cała aplikacja)</td><td>Lokalny (komponent)</td></tr>
      <tr><td>Cykl życia</td><td>Żyje z aplikacją</td><td>Żyje z komponentem</td></tr>
      <tr><td>Boilerplate</td><td>Actions + Reducer + Selectors</td><td>select + updater + effect</td></tr>
      <tr><td>DevTools</td><td>Tak (Redux DevTools)</td><td>Nie (wymaga własnego rozwiązania)</td></tr>
      <tr><td>Testowanie</td><td>Marble testing</td><td>Standardowe unit testy</td></tr>
    </table>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
  `,
})
export class CsInstallDemoComponent {}
