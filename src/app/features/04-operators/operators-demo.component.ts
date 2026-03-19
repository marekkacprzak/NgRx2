import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OperatorsInstallDemoComponent } from './subtabs/install-demo.component';
import { OperatorsUsageDemoComponent } from './subtabs/operators-usage-demo.component';

@Component({
  selector: 'app-operators-demo',
  standalone: true,
  imports: [
    MatTabsModule,
    OperatorsInstallDemoComponent,
    OperatorsUsageDemoComponent,
  ],
  template: `
    <h2>4. NgRx Operators</h2>
    <p>Specjalizowane operatory RxJS dla NgRx.</p>

    <mat-tab-group animationDuration="0ms">
      <mat-tab label="Instalacja">
        <ng-template matTabContent>
          <app-operators-install />
        </ng-template>
      </mat-tab>
      <mat-tab label="Operators">
        <ng-template matTabContent>
          <app-operators-usage />
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    :host { display: block; padding: 16px; }
    h2 { color: #1976d2; }
  `,
})
export class OperatorsDemoComponent {}
