import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DataInstallDemoComponent } from './subtabs/install-demo.component';
import { DataArchitectureDemoComponent } from './subtabs/architecture-demo.component';
import { DataEntityMetadataDemoComponent } from './subtabs/entity-metadata-demo.component';
import { DataEntityActionsDemoComponent } from './subtabs/entity-actions-demo.component';
import { DataEntityCollectionDemoComponent } from './subtabs/entity-collection-demo.component';
import { DataEntityServicesDemoComponent } from './subtabs/entity-services-demo.component';
import { DataDataserviceDemoComponent } from './subtabs/dataservice-demo.component';
import { DataEntityEffectsDemoComponent } from './subtabs/entity-effects-demo.component';
import { DataEntityReducerDemoComponent } from './subtabs/entity-reducer-demo.component';

@Component({
  selector: 'app-data-demo',
  standalone: true,
  imports: [
    MatTabsModule,
    DataInstallDemoComponent,
    DataArchitectureDemoComponent,
    DataEntityMetadataDemoComponent,
    DataEntityActionsDemoComponent,
    DataEntityCollectionDemoComponent,
    DataEntityServicesDemoComponent,
    DataDataserviceDemoComponent,
    DataEntityEffectsDemoComponent,
    DataEntityReducerDemoComponent,
  ],
  template: `
    <h2>7. NgRx Data</h2>
    <p>Automatyzacja CRUD z EntityCollectionService.</p>

    <mat-tab-group animationDuration="0ms">
      <mat-tab label="Instalacja">
        <ng-template matTabContent><app-data-install /></ng-template>
      </mat-tab>
      <mat-tab label="Architektura">
        <ng-template matTabContent><app-data-architecture /></ng-template>
      </mat-tab>
      <mat-tab label="Metadata">
        <ng-template matTabContent><app-data-metadata /></ng-template>
      </mat-tab>
      <mat-tab label="Actions">
        <ng-template matTabContent><app-data-actions /></ng-template>
      </mat-tab>
      <mat-tab label="Collection">
        <ng-template matTabContent><app-data-collection /></ng-template>
      </mat-tab>
      <mat-tab label="Services">
        <ng-template matTabContent><app-data-services /></ng-template>
      </mat-tab>
      <mat-tab label="DataService">
        <ng-template matTabContent><app-data-dataservice /></ng-template>
      </mat-tab>
      <mat-tab label="Effects">
        <ng-template matTabContent><app-data-effects /></ng-template>
      </mat-tab>
      <mat-tab label="Reducer">
        <ng-template matTabContent><app-data-reducer /></ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    h2 { color: #1976d2; }
  `,
})
export class DataDemoComponent {}
