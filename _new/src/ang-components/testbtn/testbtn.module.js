import angular from 'angular';
import { TestAddDirective } from './testbtn.directive';

export const AppAddBtn = angular
	.module('appbtn2',[])
	.directive('btnAddTest', TestAddDirective)
	.name;
