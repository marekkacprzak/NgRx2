import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCollectionService } from '../product-collection.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-data-services',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, FormsModule],
  template: `
    <h3>Entity Collection Service — Demo CRUD</h3>

    <div class="demo-section">
      <button (click)="loadProducts()">Załaduj produkty</button>

      @if (products.loading$ | async) {
        <p class="loading">Ładowanie...</p>
      }

      <div class="add-form">
        <input [(ngModel)]="newName" placeholder="Nazwa produktu" />
        <input [(ngModel)]="newPrice" type="number" placeholder="Cena" />
        <input [(ngModel)]="newCategory" placeholder="Kategoria" />
        <button (click)="addProduct()" [disabled]="!newName">Dodaj</button>
      </div>

      <table>
        <tr><th>ID</th><th>Nazwa</th><th>Cena</th><th>Kategoria</th><th>Akcje</th></tr>
        @for (product of products.entities$ | async; track product.id) {
          <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price | currency: 'PLN' : 'symbol' : '1.0-0' : 'pl' }}</td>
            <td>{{ product.category }}</td>
            <td><button class="delete" (click)="deleteProduct(product)">Usuń</button></td>
          </tr>
        }
      </table>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; }
    .add-form { display: flex; gap: 8px; margin: 12px 0; flex-wrap: wrap; }
    .add-form input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 8px 16px; cursor: pointer; background: #1976d2; color: white; border: none; border-radius: 4px; }
    button:hover { background: #1565c0; }
    button:disabled { background: #ccc; }
    .delete { background: #f44336; padding: 4px 8px; font-size: 0.85em; }
    .delete:hover { background: #d32f2f; }
    .loading { color: #ff9800; font-style: italic; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
  `,
})
export class DataEntityServicesDemoComponent {
  readonly products = inject(ProductCollectionService);
  newName = '';
  newPrice = 0;
  newCategory = '';

  loadProducts(): void {
    this.products.getAll();
  }

  addProduct(): void {
    this.products.add({
      id: 0,
      name: this.newName,
      price: this.newPrice,
      category: this.newCategory,
    } as Product);
    this.newName = '';
    this.newPrice = 0;
    this.newCategory = '';
  }

  deleteProduct(product: Product): void {
    this.products.delete(product);
  }
}
