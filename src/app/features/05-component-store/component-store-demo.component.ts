import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { provideComponentStore } from '@ngrx/component-store';
import { CartStore } from './store/cart.store';
import { CsInstallDemoComponent } from './subtabs/install-demo.component';
import { CsInitializationDemoComponent } from './subtabs/initialization-demo.component';
import { CsReadDemoComponent } from './subtabs/read-demo.component';
import { CsWriteDemoComponent } from './subtabs/write-demo.component';
import { CsEffectDemoComponent } from './subtabs/effect-demo.component';
import { CsLifecycleDemoComponent } from './subtabs/lifecycle-demo.component';
import { CsComparisonDemoComponent } from './subtabs/comparison-demo.component';
import { CsUsageDemoComponent } from './subtabs/usage-demo.component';

@Component({
  selector: 'app-component-store-demo',
  standalone: true,
  imports: [
    MatTabsModule,
    CsInstallDemoComponent,
    CsInitializationDemoComponent,
    CsReadDemoComponent,
    CsWriteDemoComponent,
    CsEffectDemoComponent,
    CsLifecycleDemoComponent,
    CsComparisonDemoComponent,
    CsUsageDemoComponent,
  ],
  providers: [provideComponentStore(CartStore)],
  template: `
    <h2>5. NgRx Component Store</h2>
    <p>Lokalne zarządzanie stanem na poziomie komponentu.</p>

    <mat-tab-group animationDuration="0ms">
      <mat-tab label="Instalacja">
        <ng-template matTabContent><app-cs-install /></ng-template>
      </mat-tab>
      <mat-tab label="Inicjalizacja">
        <ng-template matTabContent><app-cs-initialization /></ng-template>
      </mat-tab>
      <mat-tab label="Odczyt">
        <ng-template matTabContent><app-cs-read /></ng-template>
      </mat-tab>
      <mat-tab label="Zapis">
        <ng-template matTabContent><app-cs-write /></ng-template>
      </mat-tab>
      <mat-tab label="Effect">
        <ng-template matTabContent><app-cs-effect /></ng-template>
      </mat-tab>
      <mat-tab label="Lifecycle">
        <ng-template matTabContent><app-cs-lifecycle /></ng-template>
      </mat-tab>
      <mat-tab label="Porównanie">
        <ng-template matTabContent><app-cs-comparison /></ng-template>
      </mat-tab>
      <mat-tab label="Użycie">
        <ng-template matTabContent><app-cs-usage /></ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    h2 { color: #1976d2; }
  `,
})
export class ComponentStoreDemoComponent {}
