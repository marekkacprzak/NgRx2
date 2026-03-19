import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

registerLocaleData(localePl);

// Fix: @ngrx/component ZonelessTickScheduler stores requestAnimationFrame
// without binding to window, causing "Illegal invocation" in Angular 21 (zoneless).
const origRAF = window.requestAnimationFrame;
window.requestAnimationFrame = (cb: FrameRequestCallback) => origRAF.call(window, cb);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
