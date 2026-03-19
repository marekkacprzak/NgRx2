import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EffectsActions } from '../store/effects.actions';
import { selectCounter } from '../store/effects.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-effects-operators',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>Operatory NgRx Effects</h3>
    <p>NgRx dostarcza specjalizowane operatory RxJS do pracy z efektami.</p>

    <div class="demo-section">
      <h4>Demo: Asynchroniczny licznik</h4>
      <p>Efekt <code>incrementCounter$</code> używa <code>withLatestFrom</code>
      + <code>delay(500)</code> do asynchronicznego inkrementowania.</p>

      <div class="counter">
        <span class="label">Licznik:</span>
        <span class="value">{{ counter$ | async }}</span>
      </div>

      <div class="actions">
        <button (click)="increment()">+1 (async, 500ms)</button>
        <button (click)="reset()">Reset</button>
      </div>
    </div>

    <h4>Kluczowe operatory</h4>
    <table>
      <tr>
        <th>Operator</th>
        <th>Opis</th>
      </tr>
      <tr>
        <td><code>ofType</code></td>
        <td>Filtruje strumień akcji po typie — podstawowy operator w każdym efekcie</td>
      </tr>
      <tr>
        <td><code>concatLatestFrom</code></td>
        <td>Leniwie pobiera najnowszą wartość ze store (lepsza alternatywa dla <code>withLatestFrom</code>)</td>
      </tr>
      <tr>
        <td><code>switchMap</code></td>
        <td>Anuluje poprzednie wywołanie — idealne dla wyszukiwania</td>
      </tr>
      <tr>
        <td><code>exhaustMap</code></td>
        <td>Ignoruje nowe akcje do zakończenia bieżącej — idealne dla logowania</td>
      </tr>
      <tr>
        <td><code>mergeMap</code></td>
        <td>Równoległe przetwarzanie — idealne dla usuwania wielu elementów</td>
      </tr>
    </table>

    <h4>concatLatestFrom vs withLatestFrom</h4>
    <pre><code [textContent]="comparisonCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    .counter { margin: 12px 0; }
    .label { font-weight: bold; margin-right: 8px; }
    .value { font-size: 1.5em; color: #1976d2; }
    .actions { display: flex; gap: 8px; }
    .actions button { padding: 8px 16px; cursor: pointer; background: #1976d2; color: white; border: none; border-radius: 4px; }
    .actions button:hover { background: #1565c0; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class EffectsOperatorsDemoComponent {
  private readonly store = inject(Store);
  readonly counter$ = this.store.select(selectCounter);

  readonly comparisonCode = `// concatLatestFrom — leniwe (zalecane przez NgRx)
createEffect(() => this.actions$.pipe(
  ofType(MyActions.doSomething),
  concatLatestFrom(() => this.store.select(selectData)),
  map(([action, data]) => ...)
));

// withLatestFrom — eagerne (subskrypcja od razu)
createEffect(() => this.actions$.pipe(
  ofType(MyActions.doSomething),
  withLatestFrom(this.store.select(selectData)),
  map(([action, data]) => ...)
));`;

  increment(): void {
    this.store.dispatch(EffectsActions.incrementCounter());
  }

  reset(): void {
    this.store.dispatch(EffectsActions.resetCounter());
  }
}
