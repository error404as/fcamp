import angular from 'angular';
import component from './confirm.component';
import ngSanitize from 'angular-sanitize';

export const ConfirmAction = angular
	.module('confirmAction',[ngSanitize])
	.component('confirmThis', component)
	.name;
