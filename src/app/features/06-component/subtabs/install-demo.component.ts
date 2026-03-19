import { Component } from '@angular/core';

@Component({
  selector: 'app-component-install',
  standalone: true,
  template: `
    <h3>Instalacja NgRx Component</h3>

    <div class="warning">
      <strong>Uwaga:</strong> <code>&#64;ngrx/component</code> jest w trybie
      <strong>maintenance</strong> od NgRx 16+. Pakiet otrzymuje tylko
      krytyczne poprawki bezpieczeństwa. Dla nowych projektów preferuj
      Angular Signals lub <code>async</code> pipe.
    </div>

    <h4>1. Instalacja</h4>
    <pre><code>pnpm add &#64;ngrx/component</code></pre>

    <h4>2. Co dostarcza?</h4>
    <table>
      <tr><th>Element</th><th>Opis</th></tr>
      <tr>
        <td><code>*ngrxLet</code></td>
        <td>Dyrektywa strukturalna — lepsza alternatywa dla <code>*ngIf</code> z <code>async</code> pipe</td>
      </tr>
      <tr>
        <td><code>ngrxPush</code></td>
        <td>Pipe — alternatywa dla <code>async</code> pipe z obsługą różnych strategii CD</td>
      </tr>
    </table>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .warning { background: #fff3e0; border-left: 4px solid #ff9800; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
  `,
})
export class ComponentInstallDemoComponent {}
