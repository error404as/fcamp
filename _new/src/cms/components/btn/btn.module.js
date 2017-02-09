import angular from 'angular';
import component from './btn.component';

export const CmsBtn = angular
	.module('btn',[])
	.component('btn', component)
	.name;
