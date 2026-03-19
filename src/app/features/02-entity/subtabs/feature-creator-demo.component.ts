import { Component } from '@angular/core';

@Component({
  selector: 'app-entity-feature-creator',
  standalone: true,
  template: `
    <h3>Entity Adapter z createFeature</h3>
    <p><code>createFeature</code> automatycznie generuje selektory na podstawie nazwy feature i reducera.</p>

    <h4>Definicja feature z adapterem</h4>
    <pre><code [textContent]="featureCode"></code></pre>

    <h4>Auto-generowane selektory</h4>
    <pre><code [textContent]="selectorsCode"></code></pre>

    <h4>Selektory adaptera</h4>
    <pre><code [textContent]="adapterSelectorsCode"></code></pre>

    <div class="info-box">
      <p><strong>Korzyści z createFeature:</strong></p>
      <ul>
        <li>Automatyczne generowanie selektorów — mniej boilerplate</li>
        <li>Typowane selektory — pełna obsługa TypeScript</li>
        <li>Łatwa integracja z <code>provideStore</code></li>
        <li>Kompatybilność z <code>EntityAdapter.getSelectors()</code></li>
      </ul>
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
    .info-box { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-top: 16px; }
  `,
})
export class EntityFeatureCreatorDemoComponent {
  readonly featureCode = `export const entityFeature = createFeature({
  name: 'entityDemo',
  reducer: createReducer(
    initialState,
    on(EntityActions.loadTasksSuccess, (state, { tasks }) =>
      taskAdapter.setAll(tasks, { ...state, loaded: true })
    ),
    on(EntityActions.addTask, (state, { task }) =>
      taskAdapter.addOne(task, state)
    ),
    // ... więcej handlerów
  ),
});`;

  readonly selectorsCode = `// Auto-generowane przez createFeature:
entityFeature.selectEntityDemoState  // cały stan feature
entityFeature.selectIds              // tablica ID
entityFeature.selectEntities         // mapa encji
entityFeature.selectLoaded           // boolean loaded
entityFeature.selectSelectedId       // number | null`;

  readonly adapterSelectorsCode = `// Selektory adaptera z getSelectors():
const { selectAll, selectEntities, selectTotal } =
  taskAdapter.getSelectors(entityFeature.selectEntityDemoState);

// selectAll      → Task[] (tablica wszystkich encji)
// selectEntities → Dictionary<Task> (mapa ID → encja)
// selectTotal    → number (liczba encji)`;
}
