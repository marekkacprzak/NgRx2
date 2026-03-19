import { Component } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-component-push',
  standalone: true,
  imports: [PushPipe, AsyncPipe],
  template: `
    <h3>Pipe ngrxPush</h3>
    <p><code>ngrxPush</code> to alternatywa dla <code>async</code> pipe
    z lepszą integracją z change detection.</p>

    <div class="demo-section">
      <h4>Porównanie: async vs ngrxPush</h4>
      <table>
        <tr>
          <th>async pipe</th>
          <th>ngrxPush pipe</th>
        </tr>
        <tr>
          <td><span class="value">{{ counter$ | async }}</span></td>
          <td><span class="value">{{ counter$ | ngrxPush }}</span></td>
        </tr>
      </table>
      <p class="hint">Obie wartości powinny być identyczne — licznik rośnie co sekundę.</p>
    </div>

    <h4>Kiedy używać ngrxPush?</h4>
    <ul>
      <li>Komponenty z <code>ChangeDetectionStrategy.OnPush</code></li>
      <li>Gdy async pipe nie aktualizuje widoku poprawnie</li>
      <li>Zone-less aplikacje (bez zone.js)</li>
    </ul>

    <h4>Składnia</h4>
    <pre><code [textContent]="syntaxCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: center; padding: 12px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    .value { font-size: 1.5em; color: #1976d2; }
    .hint { color: #666; font-style: italic; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class ComponentPushDemoComponent {
  readonly counter$ = interval(1000).pipe(
    startWith(0),
    map((i) => i),
  );

  readonly syntaxCode = `// async pipe (standard Angular)
{{ data$ | async }}

// ngrxPush pipe (z @ngrx/component)
{{ data$ | ngrxPush }}`;
}
