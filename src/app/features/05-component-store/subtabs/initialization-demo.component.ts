import { Component } from '@angular/core';

@Component({
  selector: 'app-cs-initialization',
  standalone: true,
  template: `
    <h3>Inicjalizacja Component Store</h3>

    <h4>1. Eager (w konstruktorze)</h4>
    <pre><code [textContent]="eagerCode"></code></pre>

    <h4>2. Lazy (setState w komponencie)</h4>
    <pre><code [textContent]="lazyCode"></code></pre>

    <div class="info-box">
      <p><strong>Kiedy co stosować?</strong></p>
      <ul>
        <li><strong>Eager</strong> — gdy znasz stan początkowy z góry</li>
        <li><strong>Lazy</strong> — gdy stan zależy od danych wejściowych komponentu (np. &#64;Input)</li>
      </ul>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    .info-box { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class CsInitializationDemoComponent {
  readonly eagerCode = `@Injectable()
export class CartStore extends ComponentStore<CartState> {
  constructor() {
    super({ items: [], initialized: false }); // stan od razu
  }
}`;

  readonly lazyCode = `@Injectable()
export class CartStore extends ComponentStore<CartState> {
  constructor() {
    super(); // bez stanu!
  }
}

// w komponencie:
@Component({ providers: [CartStore] })
export class CartComponent {
  private store = inject(CartStore);

  ngOnInit() {
    this.store.setState({ items: this.initialItems, initialized: true });
  }
}`;
}
