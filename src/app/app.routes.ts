import { Routes } from '@angular/router';
import { Component } from '@angular/core';

// Dummy component for Router Store demo navigation
@Component({ standalone: true, template: '' })
class EmptyComponent {}

export const routes: Routes = [
  { path: '', component: EmptyComponent },
  { path: 'demo/:id', component: EmptyComponent },
  { path: '**', redirectTo: '' },
];
