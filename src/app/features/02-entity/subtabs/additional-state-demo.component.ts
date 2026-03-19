import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { EntityActions } from '../store/entity.actions';
import {
  selectAllTasks,
  selectLoaded,
  selectSelectedId,
  selectTaskEntities,
} from '../store/entity.reducer';

@Component({
  selector: 'app-entity-additional-state',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <h3>Dodatkowe właściwości stanu</h3>
    <p>EntityState można rozszerzyć o własne właściwości takie jak
    <code>loaded</code>, <code>selectedId</code>, <code>error</code>.</p>

    <div class="demo-section">
      <h4>Stan encji</h4>
      <div class="state-info">
        <div><strong>loaded:</strong> {{ loaded$ | async }}</div>
        <div><strong>selectedId:</strong> {{ selectedId$ | async }}</div>
      </div>

      <h4>Wybierz zadanie</h4>
      <ul>
        @for (task of tasks$ | async; track task.id) {
          <li
            (click)="selectTask(task.id)"
            [class.selected]="task.id === (selectedId$ | async)"
          >
            {{ task.title }}
          </li>
        }
      </ul>

      @if (selectedId$ | async; as selectedId) {
        <div class="selected-detail">
          <h4>Wybrana encja (JSON)</h4>
          <pre>{{ (entities$ | async)?.[selectedId] | json }}</pre>
        </div>
      }
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    .demo-section { background: #f9f9f9; padding: 16px; border-radius: 8px; }
    .state-info { display: flex; gap: 24px; margin: 8px 0 16px; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #eee; }
    li:hover { background: #e3f2fd; }
    li.selected { background: #bbdefb; font-weight: bold; }
    .selected-detail { background: #e8f5e9; padding: 12px; border-radius: 4px; margin-top: 12px; }
    pre { margin: 0; }
  `,
})
export class EntityAdditionalStateDemoComponent {
  private readonly store = inject(Store);

  readonly tasks$ = this.store.select(selectAllTasks);
  readonly loaded$ = this.store.select(selectLoaded);
  readonly selectedId$ = this.store.select(selectSelectedId);
  readonly entities$ = this.store.select(selectTaskEntities);

  selectTask(id: number): void {
    this.store.dispatch(EntityActions.selectTask({ id }));
  }
}
