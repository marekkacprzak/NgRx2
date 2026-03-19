import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet } from '@angular/router';
import { RouterStoreInstallDemoComponent } from './subtabs/install-demo.component';
import { RouterStoreActionsDemoComponent } from './subtabs/actions-demo.component';
import { RouterStoreSelectorsDemoComponent } from './subtabs/selectors-demo.component';
import { RouterStoreConfigDemoComponent } from './subtabs/configuration-demo.component';

@Component({
  selector: 'app-router-store-demo',
  standalone: true,
  imports: [
    MatTabsModule,
    RouterOutlet,
    RouterStoreInstallDemoComponent,
    RouterStoreActionsDemoComponent,
    RouterStoreSelectorsDemoComponent,
    RouterStoreConfigDemoComponent,
  ],
  template: `
    <h2>3. NgRx Router Store</h2>
    <p>Synchronizacja stanu routera Angular z NgRx Store.</p>

    <mat-tab-group animationDuration="0ms">
      <mat-tab label="Instalacja">
        <ng-template matTabContent>
          <app-router-store-install />
        </ng-template>
      </mat-tab>
      <mat-tab label="Actions">
        <ng-template matTabContent>
          <app-router-store-actions />
        </ng-template>
      </mat-tab>
      <mat-tab label="Selectors">
        <ng-template matTabContent>
          <app-router-store-selectors />
        </ng-template>
      </mat-tab>
      <mat-tab label="Konfiguracja">
        <ng-template matTabContent>
          <app-router-store-config />
        </ng-template>
      </mat-tab>
    </mat-tab-group>

    <div class="router-outlet-container">
      <router-outlet />
    </div>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    h2 { color: #1976d2; }
    .router-outlet-container { display: none; }
  `,
})
export class RouterStoreDemoComponent {}
