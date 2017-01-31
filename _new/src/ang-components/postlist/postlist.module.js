import angular from 'angular';
import component from './postlist.component';
import AppService from '../../app.service';
import { pager } from '../../app.filters';
import { appPager } from '../pager/pager.module';

export const PostList = angular
	.module('postsList',[AppService, appPager])
	.component('postList', component)
	.name;

