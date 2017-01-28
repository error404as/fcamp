import angular from 'angular';
import { PostAdd } from './postadd/postadd.module';
import { PostList } from './postlist/postlist.module';

export const ComponentsModule = angular
  .module('app.components', [
    PostAdd,
    PostList,
  ])
  .name;