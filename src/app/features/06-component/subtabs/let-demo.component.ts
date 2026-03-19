import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { interval, Observable, of, delay, startWith } from 'rxjs';

@Component({
  selector: 'app-component-let',
  standalone: true,
  imports: [LetDirective],
  template: `
    <h3>Dyrektywa *ngrxLet</h3>
    <p><code>*ngrxLet</code> subskrybuje Observable i udostępnia wartość w szablonie.</p>

    <div class="demo-section">
      <h4>Demo: Timer</h4>
      <div *ngrxLet="timer$ as value">
        <span class="label">Czas:</span>
        <span class="value">{{ value }}s</span>
      </div>

      <h4>Demo: Z obsługą błędu i suspense</h4>
      <div *ngrxLet="delayedData$ as data; error as e; suspenseTpl: loadingTpl">
        <p>Dane załadowane: <strong>{{ data }}</strong></p>
      </div>
      <ng-template #loadingTpl>
        <p class="loading">Ładowanie danych...</p>
      </ng-template>
    </div>

    <h4>Zalety vs async pipe</h4>
    <ul>
      <li>Obsługuje <code>null</code> i <code>undefined</code> bez problemu</li>
      <li>Wbudowane szablony dla loading (<code>suspenseTpl</code>) i error (<code>errorTpl</code>)</li>
      <li>Nie wymaga dodatkowego <code>*ngIf</code> wrappera</li>
      <li>Działa z OnPush change detection</li>
    </ul>

    <h4>Składnia</h4>
    <pre><code [textContent]="syntaxCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    .label { font-weight: bold; margin-right: 8px; }
    .value { font-size: 1.5em; color: #1976d2; }
    .loading { color: #ff9800; font-style: italic; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class ComponentLetDemoComponent {
  readonly timer$ = interval(1000).pipe(startWith(0));

  readonly delayedData$: Observable<string> = of('Witaj z ngrxLet!').pipe(
    delay(2000),
  );

  readonly syntaxCode = `<div *ngrxLet="data$ as data; error as e; suspenseTpl: loading; errorTpl: err">
  {{ data }}
</div>

<ng-template #loading>
  <p>Ładowanie...</p>
</ng-template>

<ng-template #err let-error>
  <p>Błąd: {{ error }}</p>
</ng-template>`;
}
