import { Component } from '@angular/core';

@Component({
  selector: 'app-entity-interfaces',
  standalone: true,
  template: `
    <h3>Interfejsy NgRx Entity</h3>
    <p>NgRx Entity dostarcza interfejsy i adapter do efektywnego zarządzania kolekcjami encji.</p>

    <h4>EntityState&lt;T&gt;</h4>
    <p>Predefiniowany kształt stanu dla kolekcji encji:</p>
    <pre><code [textContent]="entityStateCode"></code></pre>

    <h4>EntityAdapter&lt;T&gt;</h4>
    <p>Adapter dostarcza metody CRUD do manipulacji kolekcją:</p>
    <pre><code [textContent]="adapterCode"></code></pre>

    <h4>Rozszerzanie EntityState</h4>
    <p>Można dodać własne właściwości do stanu encji:</p>
    <pre><code [textContent]="extendedCode"></code></pre>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
  `,
})
export class EntityInterfacesDemoComponent {
  readonly entityStateCode = `interface EntityState<T> {
  ids: string[] | number[];      // Tablica ID w kolejności
  entities: Dictionary<T>;       // Mapa ID -> encja
}`;

  readonly adapterCode = `const adapter = createEntityAdapter<Task>();

// Metody adaptera:
adapter.addOne(entity, state)       // Dodaj jedną encję
adapter.addMany(entities, state)    // Dodaj wiele encji
adapter.setAll(entities, state)     // Zastąp wszystkie
adapter.updateOne(update, state)    // Zaktualizuj jedną
adapter.removeOne(id, state)        // Usuń jedną
adapter.removeAll(state)            // Usuń wszystkie
adapter.upsertOne(entity, state)    // Dodaj lub zaktualizuj`;

  readonly extendedCode = `interface TaskEntityState extends EntityState<Task> {
  loaded: boolean;
  selectedId: number | null;
}

const initialState: TaskEntityState = adapter.getInitialState({
  loaded: false,
  selectedId: null,
});`;
}
