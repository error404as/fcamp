import angular from 'angular';
import component from './postlist.component';
import AppService from '../../app.service';
import { pager } from '../../app.filters';
import { appPager } from '../pager/pager.module';
import { postTotal } from '../total/total.module';

export const PostList = angular
	.module('postsList', [AppService, appPager, postTotal])
	.component('postList', component)
	.name;

