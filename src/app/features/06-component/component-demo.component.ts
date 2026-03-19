import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentInstallDemoComponent } from './subtabs/install-demo.component';
import { ComponentLetDemoComponent } from './subtabs/let-demo.component';
import { ComponentPushDemoComponent } from './subtabs/push-demo.component';

@Component({
  selector: 'app-component-demo',
  standalone: true,
  imports: [
    MatTabsModule,
    ComponentInstallDemoComponent,
    ComponentLetDemoComponent,
    ComponentPushDemoComponent,
  ],
  template: `
    <h2>6. NgRx Component</h2>
    <p>Dyrektywy i pipe do pracy z Observable w szablonach.</p>

    <mat-tab-group animationDuration="0ms">
      <mat-tab label="Instalacja">
        <ng-template matTabContent>
          <app-component-install />
        </ng-template>
      </mat-tab>
      <mat-tab label="*ngrxLet">
        <ng-template matTabContent>
          <app-component-let />
        </ng-template>
      </mat-tab>
      <mat-tab label="ngrxPush">
        <ng-template matTabContent>
          <app-component-push />
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    h2 { color: #1976d2; }
  `,
})
export class ComponentDemoComponent {}
