import angular from 'angular';
import component from './addbtn.component';

export const AppAddPost = angular
	.module('appbtn',[])
	.component('btnAddPost', component)
	.name;
