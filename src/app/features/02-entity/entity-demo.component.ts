import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EntityInterfacesDemoComponent } from './subtabs/interfaces-demo.component';
import { EntityAdapterDemoComponent } from './subtabs/adapter-demo.component';
import { EntityAdditionalStateDemoComponent } from './subtabs/additional-state-demo.component';
import { EntityFeatureCreatorDemoComponent } from './subtabs/feature-creator-demo.component';

@Component({
  selector: 'app-entity-demo',
  standalone: true,
  imports: [
    MatTabsModule,
    EntityInterfacesDemoComponent,
    EntityAdapterDemoComponent,
    EntityAdditionalStateDemoComponent,
    EntityFeatureCreatorDemoComponent,
  ],
  template: `
    <h2>2. NgRx Entity</h2>
    <p>Zarządzanie kolekcjami encji z EntityAdapter.</p>

    <mat-tab-group animationDuration="0ms">
      <mat-tab label="Interfejsy">
        <ng-template matTabContent>
          <app-entity-interfaces />
        </ng-template>
      </mat-tab>
      <mat-tab label="Adapter">
        <ng-template matTabContent>
          <app-entity-adapter />
        </ng-template>
      </mat-tab>
      <mat-tab label="Dodatkowy stan">
        <ng-template matTabContent>
          <app-entity-additional-state />
        </ng-template>
      </mat-tab>
      <mat-tab label="Feature Creator">
        <ng-template matTabContent>
          <app-entity-feature-creator />
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    h2 { color: #1976d2; }
  `,
})
export class EntityDemoComponent {}
