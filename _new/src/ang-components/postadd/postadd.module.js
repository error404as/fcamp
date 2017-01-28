import angular from 'angular';
import { PostAddDirective } from './postadd.directive';
import InputCheck from '../inputvalid/input.module';

export const PostAdd = angular
	.module('postadd',[])
	.directive('postAdd', PostAddDirective)
	.directive('myCheckValids', InputCheck)
	.name;




