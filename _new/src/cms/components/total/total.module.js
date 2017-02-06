import angular from 'angular';
import component from './total.component';

export const postTotal = angular
	.module('postTotal',[])
	.component('postsTotal', component)
	.name;
