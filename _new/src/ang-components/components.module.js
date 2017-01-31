import angular from 'angular';
import { PostAdd } from './postadd/postadd.module';
import { PostList } from './postlist/postlist.module';
import { AppAddPost } from './addbtn/addbtn.module';

export const ComponentsModule = angular
  .module('app.components', [
    PostAdd,
    PostList,
    AppAddPost,
  ])
  .name;