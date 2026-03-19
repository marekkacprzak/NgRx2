import { Component } from '@angular/core';

@Component({
  selector: 'app-effects-install',
  standalone: true,
  template: `
    <h3>Instalacja NgRx Effects</h3>
    <p>NgRx Effects pozwala na izolację side effects od komponentów,
    korzystając z modelu strumieni RxJS do nasłuchiwania akcji.</p>

    <h4>1. Instalacja</h4>
    <pre><code>pnpm add &#64;ngrx/effects</code></pre>

    <h4>2. Rejestracja w app.config.ts</h4>
    <pre><code [textContent]="registrationCode"></code></pre>

    <h4>3. Struktura plików</h4>
    <pre><code>store/
├── effects.actions.ts    — createActionGroup
├── effects.reducer.ts    — createReducer + on()
├── effects.selectors.ts  — createFeatureSelector
└── effects.effects.ts    — createEffect</code></pre>

    <h4>4. Kluczowe koncepcje</h4>
    <ul>
      <li><code>createEffect</code> — tworzy efekt nasłuchujący na strumień akcji</li>
      <li><code>ofType</code> — filtruje akcje po typie</li>
      <li><code [textContent]="'{ dispatch: false }'"></code> — efekt nie emituje nowej akcji (np. logowanie)</li>
      <li><code>switchMap</code> — anuluje poprzednie wywołanie HTTP na rzecz nowego</li>
      <li><code>catchError</code> — obsługa błędów w strumieniu efektu</li>
    </ul>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    code { font-size: 0.9em; }
  `,
})
export class EffectsInstallDemoComponent {
  readonly registrationCode = `import { provideEffects } from '@ngrx/effects';
import { EffectsDemoEffects } from './effects.effects';

provideEffects(EffectsDemoEffects)`;
}
