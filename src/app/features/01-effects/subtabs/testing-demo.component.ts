import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EffectsActions } from '../store/effects.actions';
import { selectUsers, selectLoading, selectError } from '../store/effects.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-effects-testing',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>Testowanie Effects</h3>
    <p>NgRx Effects testuje się z użyciem <code>provideMockActions</code> i marble testing.</p>

    <div class="demo-section">
      <h4>Demo: Załaduj użytkowników</h4>
      <button (click)="loadUsers()">Załaduj użytkowników</button>

      @if (loading$ | async) {
        <p class="loading">Ładowanie...</p>
      }
      @if (error$ | async; as error) {
        <p class="error">Błąd: {{ error }}</p>
      }

      <ul>
        @for (user of users$ | async; track user.id) {
          <li>{{ user.name }} ({{ user.email }})</li>
        }
      </ul>
    </div>

    <h4>Przykład testu efektu</h4>
    <pre><code [textContent]="testCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    button { padding: 8px 16px; cursor: pointer; background: #1976d2; color: white; border: none; border-radius: 4px; }
    button:hover { background: #1565c0; }
    .loading { color: #ff9800; font-style: italic; }
    .error { color: #f44336; }
    ul { list-style: none; padding: 0; }
    li { padding: 4px 0; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class EffectsTestingDemoComponent {
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectUsers);
  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);

  readonly testCode = `describe('loadUsers$', () => {
  it('powinien załadować użytkowników', () => {
    actions$ = hot('-a', { a: EffectsActions.loadUsers() });
    const users = [{ id: 1, name: 'Jan', email: 'jan@example.com' }];
    userService.getUsers.and.returnValue(cold('-b|', { b: users }));

    const expected = cold('--c', {
      c: EffectsActions.loadUsersSuccess({ users })
    });
    expect(effects.loadUsers$).toBeObservable(expected);
  });
});`;

  loadUsers(): void {
    this.store.dispatch(EffectsActions.loadUsers());
  }
}
