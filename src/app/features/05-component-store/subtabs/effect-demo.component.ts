import { Component } from '@angular/core';

@Component({
  selector: 'app-cs-effect',
  standalone: true,
  template: `
    <h3>Efekty w Component Store</h3>
    <p><code>effect()</code> obsługuje side effects (HTTP, timer, etc.) wewnątrz Component Store.</p>

    <h4>Podstawowy efekt</h4>
    <pre><code [textContent]="basicEffectCode"></code></pre>

    <h4>Efekt z tapResponse</h4>
    <pre><code [textContent]="tapResponseCode"></code></pre>

    <div class="info-box">
      <p><strong>Efekt vs Updater:</strong></p>
      <ul>
        <li><code>updater</code> — synchroniczna zmiana stanu</li>
        <li><code>effect</code> — asynchroniczne operacje (HTTP, timery, WebSocket)</li>
      </ul>
      <p>Efekt może wywoływać updater po zakończeniu operacji asynchronicznej.</p>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    .info-box { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class CsEffectDemoComponent {
  readonly basicEffectCode = `readonly loadProducts = this.effect<void>(trigger$ =>
  trigger$.pipe(
    switchMap(() => {
      this.patchState({ loading: true });
      return this.productService.getProducts().pipe(
        tap(products => this.patchState({ products, loading: false })),
        catchError(err => {
          this.patchState({ error: err.message, loading: false });
          return EMPTY;
        })
      );
    })
  )
);

// Wywołanie:
this.store.loadProducts();`;

  readonly tapResponseCode = `readonly loadProducts = this.effect<void>(trigger$ =>
  trigger$.pipe(
    switchMap(() => {
      this.patchState({ loading: true });
      return this.productService.getProducts().pipe(
        tapResponse({
          next: (products) => this.patchState({ products, loading: false }),
          error: (err) => this.patchState({ error: err.message, loading: false }),
        })
      );
    })
  )
);`;
}
