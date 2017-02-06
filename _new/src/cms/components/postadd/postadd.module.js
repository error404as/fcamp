import angular from 'angular';
import { PostAddDirective } from './postadd.directive';
import InputCheck from '../inputvalid/input.module';
import AppService from '../../app.service';

export const PostAdd = angular
	.module('postadd',[AppService])
	.directive('postAdd', PostAddDirective)
	.directive('checkMinlen', InputCheck)
	.name;
