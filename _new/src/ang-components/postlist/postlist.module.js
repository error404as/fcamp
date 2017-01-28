import angular from 'angular';
import component from './postlist.component';
import AppService from '../../app.service';

export const PostList = angular
	.module('postsList',[AppService])
	.component('postList', component)
	.name;

