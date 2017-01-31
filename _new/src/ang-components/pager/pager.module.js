import angular from 'angular';
import component from './pager.component';
import { pager } from '../../app.filters';
import ngSanitize from 'angular-sanitize';

export const appPager = angular
	.module('apppager',[ngSanitize])
	.component('postPager', component)
	.filter('pager', pager)
	.name;
