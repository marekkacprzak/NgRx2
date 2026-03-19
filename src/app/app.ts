import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EffectsDemoComponent } from './features/01-effects/effects-demo.component';
import { EntityDemoComponent } from './features/02-entity/entity-demo.component';
import { RouterStoreDemoComponent } from './features/03-router-store/router-store-demo.component';
import { OperatorsDemoComponent } from './features/04-operators/operators-demo.component';
import { ComponentStoreDemoComponent } from './features/05-component-store/component-store-demo.component';
import { ComponentDemoComponent } from './features/06-component/component-demo.component';
import { DataDemoComponent } from './features/07-data/data-demo.component';

@Component({
  selector: 'app-root',
  imports: [
    MatTabsModule,
    EffectsDemoComponent,
    EntityDemoComponent,
    RouterStoreDemoComponent,
    OperatorsDemoComponent,
    ComponentStoreDemoComponent,
    ComponentDemoComponent,
    DataDemoComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
