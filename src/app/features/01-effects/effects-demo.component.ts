import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EffectsInstallDemoComponent } from './subtabs/install-demo.component';
import { EffectsTestingDemoComponent } from './subtabs/testing-demo.component';
import { EffectsLifecycleDemoComponent } from './subtabs/lifecycle-demo.component';
import { EffectsOperatorsDemoComponent } from './subtabs/operators-demo.component';

@Component({
  selector: 'app-effects-demo',
  standalone: true,
  imports: [
    MatTabsModule,
    EffectsInstallDemoComponent,
    EffectsTestingDemoComponent,
    EffectsLifecycleDemoComponent,
    EffectsOperatorsDemoComponent,
  ],
  template: `
    <h2>1. NgRx Effects</h2>
    <p>Zarządzanie side effects w aplikacji za pomocą strumieni RxJS.</p>

    <mat-tab-group animationDuration="0ms">
      <mat-tab label="Instalacja">
        <ng-template matTabContent>
          <app-effects-install />
        </ng-template>
      </mat-tab>
      <mat-tab label="Testowanie">
        <ng-template matTabContent>
          <app-effects-testing />
        </ng-template>
      </mat-tab>
      <mat-tab label="Lifecycle">
        <ng-template matTabContent>
          <app-effects-lifecycle />
        </ng-template>
      </mat-tab>
      <mat-tab label="Operatory">
        <ng-template matTabContent>
          <app-effects-operators />
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    h2 { color: #1976d2; }
  `,
})
export class EffectsDemoComponent {}
