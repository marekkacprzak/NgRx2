import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-operators-usage',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>tapResponse i mapResponse — Demo</h3>

    <div class="demo-section">
      <h4>Demo: Wyszukiwanie z tapResponse</h4>
      <p>Wpisz tekst aby wyszukać użytkowników. Efekt używa <code>tapResponse</code>
      dla bezpiecznej obsługi odpowiedzi.</p>

      <input
        type="text"
        placeholder="Szukaj użytkowników..."
        [ngModel]="searchQuery()"
        (ngModelChange)="onSearch($event)"
      />

      @if (loading()) {
        <p class="loading">Szukam...</p>
      }
      @if (error()) {
        <p class="error">Błąd: {{ error() }}</p>
      }

      <ul>
        @for (user of results(); track user.id) {
          <li>{{ user.name }} — {{ user.email }}</li>
        }
      </ul>
      @if (results().length === 0 && !loading() && searchQuery()) {
        <p class="hint">Brak wyników</p>
      }
    </div>

    <h4>Kod efektu z tapResponse</h4>
    <pre><code [textContent]="tapResponseCode"></code></pre>

    <h4>mapResponse</h4>
    <pre><code [textContent]="mapResponseCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1em; box-sizing: border-box; }
    .loading { color: #ff9800; font-style: italic; }
    .error { color: #f44336; }
    .hint { color: #999; font-style: italic; }
    ul { list-style: none; padding: 0; }
    li { padding: 6px 0; border-bottom: 1px solid #eee; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class OperatorsUsageDemoComponent {
  private readonly http = inject(HttpClient);
  private readonly search$ = new Subject<string>();

  readonly searchQuery = signal('');
  readonly results = signal<User[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  readonly tapResponseCode = `loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UsersActions.load),
    switchMap(() =>
      this.usersService.getAll().pipe(
        tapResponse({
          next: (users) => this.store.dispatch(
            UsersActions.loadSuccess({ users })
          ),
          error: (err: HttpErrorResponse) => this.store.dispatch(
            UsersActions.loadFailure({ error: err.message })
          ),
          finalize: () => console.log('zakończono'),
        })
      )
    )
  ),
  { dispatch: false }
);`;

  readonly mapResponseCode = `// mapResponse — emituje nową wartość (jak map + catchError)
searchResults$ = this.searchQuery$.pipe(
  debounceTime(300),
  switchMap((query) =>
    this.http.get<User[]>('/api/users').pipe(
      mapResponse({
        next: (users) => users.filter(u =>
          u.name.toLowerCase().includes(query)
        ),
        error: () => [] as User[],
      })
    )
  )
);`;

  constructor() {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          this.loading.set(true);
          this.error.set('');
          return this.http.get<User[]>('/api/users').pipe(
            tapResponse({
              next: (users) => {
                const filtered = query
                  ? users.filter((u) =>
                      u.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : users;
                this.results.set(filtered);
                this.loading.set(false);
              },
              error: (err: any) => {
                this.error.set(err.message ?? 'Nieznany błąd');
                this.loading.set(false);
              },
            }),
          );
        }),
      )
      .subscribe();
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.search$.next(query);
  }
}
