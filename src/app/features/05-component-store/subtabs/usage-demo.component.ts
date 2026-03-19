import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartStore } from '../store/cart.store';

@Component({
  selector: 'app-cs-usage',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  template: `
    <h3>Koszyk zakupowy — kompletny przykład</h3>

    <div class="demo-section">
      <h4>Dodaj produkty</h4>
      <div class="product-grid">
        @for (product of availableProducts; track product.productId) {
          <div class="product-card">
            <strong>{{ product.name }}</strong>
            <span>{{ product.price | currency: 'PLN' : 'symbol' : '1.0-0' : 'pl' }}</span>
            <button (click)="addToCart(product)">Dodaj do koszyka</button>
          </div>
        }
      </div>

      <h4>Koszyk</h4>
      @if ((items$ | async)?.length === 0) {
        <p class="empty">Koszyk jest pusty</p>
      }
      <ul>
        @for (item of items$ | async; track item.productId) {
          <li>
            <span class="item-name">{{ item.name }}</span>
            <span class="item-qty">x{{ item.quantity }}</span>
            <span class="item-price">{{ item.price * item.quantity | currency: 'PLN' : 'symbol' : '1.0-0' : 'pl' }}</span>
            <button class="remove" (click)="removeFromCart(item.productId)">Usuń</button>
          </li>
        }
      </ul>

      <div class="summary">
        <div>Łącznie produktów: <strong>{{ totalItems$ | async }}</strong></div>
        <div>Suma: <strong>{{ totalPrice$ | async | currency: 'PLN' : 'symbol' : '1.2-2' : 'pl' }}</strong></div>
      </div>

      <button class="clear" (click)="clearCart()">Wyczyść koszyk</button>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 20px; }
    .product-card { background: white; padding: 12px; border-radius: 8px; border: 1px solid #ddd; display: flex; flex-direction: column; gap: 8px; }
    .product-card button { padding: 6px; cursor: pointer; background: #4caf50; color: white; border: none; border-radius: 4px; }
    .product-card button:hover { background: #43a047; }
    .empty { color: #999; font-style: italic; }
    ul { list-style: none; padding: 0; }
    li { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #eee; }
    .item-name { flex: 1; }
    .item-qty { color: #666; }
    .item-price { font-weight: bold; min-width: 80px; text-align: right; }
    .remove { padding: 4px 8px; cursor: pointer; background: #f44336; color: white; border: none; border-radius: 4px; font-size: 0.85em; }
    .remove:hover { background: #d32f2f; }
    .summary { display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #1976d2; margin-top: 8px; }
    .clear { padding: 8px 16px; cursor: pointer; background: #ff9800; color: white; border: none; border-radius: 4px; margin-top: 12px; }
    .clear:hover { background: #f57c00; }
  `,
})
export class CsUsageDemoComponent {
  private readonly store = inject(CartStore);

  readonly items$ = this.store.items$;
  readonly totalItems$ = this.store.totalItems$;
  readonly totalPrice$ = this.store.totalPrice$;

  readonly availableProducts = [
    { productId: 1, name: 'Laptop', price: 3999 },
    { productId: 2, name: 'Klawiatura', price: 299 },
    { productId: 3, name: 'Mysz', price: 149 },
    { productId: 4, name: 'Monitor', price: 1299 },
  ];

  addToCart(product: { productId: number; name: string; price: number }): void {
    this.store.addItem({ ...product, quantity: 1 });
  }

  removeFromCart(productId: number): void {
    this.store.removeItem(productId);
  }

  clearCart(): void {
    this.store.clearCart();
  }
}
