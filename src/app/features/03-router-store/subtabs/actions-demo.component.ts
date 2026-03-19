import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION, ROUTER_REQUEST, ROUTER_CANCEL, ROUTER_ERROR } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-router-store-actions',
  standalone: true,
  template: `
    <h3>Router Store Actions</h3>
    <p>Każda nawigacja generuje sekwencję akcji NgRx.</p>

    <div class="demo-section">
      <h4>Nawiguj, aby zobaczyć akcje</h4>
      <div class="actions">
        <button (click)="navigate('/demo/1')">demo/1</button>
        <button (click)="navigate('/demo/42?search=ngrx')">demo/42?search=ngrx</button>
        <button (click)="navigate('/')">Powrót do /</button>
      </div>

      <h4>Log akcji routera</h4>
      <div class="log">
        @for (entry of actionLog(); track $index) {
          <div class="log-entry">
            <span class="type">{{ entry.type }}</span>
            <span class="url">{{ entry.url }}</span>
          </div>
        }
        @if (actionLog().length === 0) {
          <p class="hint">Kliknij przycisk nawigacji, aby zobaczyć akcje...</p>
        }
      </div>
    </div>

    <h4>Typy akcji</h4>
    <table>
      <tr><th>Akcja</th><th>Kiedy</th></tr>
      <tr><td><code>&#64;ngrx/router-store/request</code></td><td>Przed nawigacją (guard + resolver)</td></tr>
      <tr><td><code>&#64;ngrx/router-store/navigation</code></td><td>Nawigacja w trakcie</td></tr>
      <tr><td><code>&#64;ngrx/router-store/navigated</code></td><td>Nawigacja zakończona</td></tr>
      <tr><td><code>&#64;ngrx/router-store/cancel</code></td><td>Nawigacja anulowana (guard)</td></tr>
      <tr><td><code>&#64;ngrx/router-store/error</code></td><td>Błąd nawigacji</td></tr>
    </table>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0; }
    .actions { display: flex; gap: 8px; margin-bottom: 16px; }
    .actions button { padding: 8px 16px; cursor: pointer; background: #1976d2; color: white; border: none; border-radius: 4px; }
    .actions button:hover { background: #1565c0; }
    .log { background: #263238; color: #aed581; padding: 12px; border-radius: 4px; max-height: 200px; overflow-y: auto; font-family: monospace; font-size: 0.85em; }
    .log-entry { padding: 2px 0; }
    .type { color: #ffcc80; margin-right: 8px; }
    .url { color: #80cbc4; }
    .hint { color: #78909c; font-style: italic; margin: 0; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
  `,
})
export class RouterStoreActionsDemoComponent implements OnInit, OnDestroy {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private sub?: Subscription;

  readonly actionLog = signal<Array<{ type: string; url: string }>>([]);

  ngOnInit(): void {
    this.sub = this.actions$
      .pipe(
        ofType(
          ROUTER_REQUEST,
          ROUTER_NAVIGATION,
          ROUTER_NAVIGATED,
          ROUTER_CANCEL,
          ROUTER_ERROR,
        ),
      )
      .subscribe((action: any) => {
        this.actionLog.update((log) => [
          ...log,
          {
            type: action.type,
            url: action.payload?.routerState?.url ?? '?',
          },
        ]);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  navigate(path: string): void {
    const [url, queryString] = path.split('?');
    const queryParams: Record<string, string> = {};
    if (queryString) {
      queryString.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        queryParams[key] = value;
      });
    }
    this.router.navigate([url], { queryParams });
  }
}
