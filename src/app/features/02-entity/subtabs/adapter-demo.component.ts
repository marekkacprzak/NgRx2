import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { EntityActions } from '../store/entity.actions';
import {
  selectAllTasks,
  selectTaskTotal,
  selectTasksLoading,
} from '../store/entity.reducer';

@Component({
  selector: 'app-entity-adapter',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  template: `
    <h3>Entity Adapter — Demo CRUD</h3>

    <div class="demo-section">
      <button (click)="loadTasks()">Załaduj zadania z API</button>

      @if (loading$ | async) {
        <p class="loading">Ładowanie...</p>
      }

      <div class="add-form">
        <input
          type="text"
          [(ngModel)]="newTaskTitle"
          placeholder="Nowe zadanie..."
          (keyup.enter)="addTask()"
        />
        <button (click)="addTask()" [disabled]="!newTaskTitle()">Dodaj</button>
      </div>

      <p>Liczba zadań: {{ total$ | async }}</p>

      <ul>
        @for (task of tasks$ | async; track task.id) {
          <li [class.completed]="task.completed">
            <input
              type="checkbox"
              [checked]="task.completed"
              (change)="toggleTask(task.id)"
            />
            <span>{{ task.title }}</span>
            <button class="delete" (click)="removeTask(task.id)">Usuń</button>
          </li>
        }
      </ul>

      <button class="clear" (click)="clearAll()">Wyczyść wszystko</button>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; }
    .add-form { display: flex; gap: 8px; margin: 12px 0; }
    .add-form input { flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 8px 16px; cursor: pointer; background: #1976d2; color: white; border: none; border-radius: 4px; }
    button:hover { background: #1565c0; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .delete { background: #f44336; padding: 4px 8px; font-size: 0.85em; }
    .delete:hover { background: #d32f2f; }
    .clear { background: #ff9800; margin-top: 12px; }
    .clear:hover { background: #f57c00; }
    .loading { color: #ff9800; font-style: italic; }
    ul { list-style: none; padding: 0; }
    li { display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid #eee; }
    .completed span { text-decoration: line-through; color: #999; }
  `,
})
export class EntityAdapterDemoComponent {
  private readonly store = inject(Store);
  private nextId = 100;

  readonly tasks$ = this.store.select(selectAllTasks);
  readonly total$ = this.store.select(selectTaskTotal);
  readonly loading$ = this.store.select(selectTasksLoading);

  readonly newTaskTitle = signal('');

  loadTasks(): void {
    this.store.dispatch(EntityActions.loadTasks());
  }

  addTask(): void {
    const title = this.newTaskTitle().trim();
    if (!title) return;
    this.store.dispatch(
      EntityActions.addTask({
        task: { id: this.nextId++, title, completed: false },
      }),
    );
    this.newTaskTitle.set('');
  }

  toggleTask(id: number): void {
    this.store.dispatch(EntityActions.toggleTask({ id }));
  }

  removeTask(id: number): void {
    this.store.dispatch(EntityActions.removeTask({ id }));
  }

  clearAll(): void {
    this.store.dispatch(EntityActions.clearTasks());
  }
}
