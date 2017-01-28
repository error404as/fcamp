import angular from 'angular';
import ngRouter from 'angular-route';
//import uiRouter from 'angular-ui-router';
import AppRouter from './app.router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './ang-components/components.module';


export const AppModule = angular
  .module('app', [
    ComponentsModule,
    ngRouter
  ]).config(AppRouter)
  .component('app', AppComponent)
  .name;