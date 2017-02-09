import angular from 'angular';
import component from './addnews.component';
import AppService from '../../app.service';

export const AddNewsApi = angular
	.module('addNews', [AppService])
	.component('addNewsFromApi', component)
	.name;

