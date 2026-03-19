import { Component } from '@angular/core';

@Component({
  selector: 'app-effects-lifecycle',
  standalone: true,
  template: `
    <h3>Lifecycle Effects</h3>
    <p>NgRx Effects oferuje hooki cyklu życia do zarządzania inicjalizacją efektów.</p>

    <h4>OnInitEffects</h4>
    <p>Implementacja interfejsu <code>OnInitEffects</code> pozwala efektowi
    zdispatchować akcję po jego zainicjalizowaniu.</p>
    <pre><code [textContent]="onInitCode"></code></pre>

    <h4>OnRunEffects</h4>
    <p>Implementacja <code>OnRunEffects</code> kontroluje, kiedy efekty zaczynają nasłuchiwać.</p>
    <pre><code [textContent]="onRunCode"></code></pre>

    <div class="demo-section">
      <h4>Live Demo</h4>
      <p>Otwórz konsolę przeglądarki (F12) — zobaczysz log
      <code>[Effects Demo] OnInitEffects</code> po załadowaniu aplikacji.</p>
      <p>Każda dispatchowana akcja z tego taba jest logowana przez efekt
      <code>logActions$</code> z opcją <code [textContent]="'{ dispatch: false }'"></code>.</p>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    .demo-section { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class EffectsLifecycleDemoComponent {
  readonly onInitCode = `@Injectable()
export class MyEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return { type: '[My Feature] Init' };
  }
}`;

  readonly onRunCode = `@Injectable()
export class MyEffects implements OnRunEffects {
  ngrxOnRunEffects(resolvedEffects$: EffectNotification) {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType(AuthActions.logout)))
        )
      )
    );
  }
}`;
}
