import angular from 'angular';
import { PostAdd } from './postadd/postadd.module';
import { PostList } from './postlist/postlist.module';
import { AddNewsApi } from './addnews/addnews.module';
import { CmsBtn } from './btn/btn.module';
import { ConfirmAction } from './confirm/confirm.module';

export const ComponentsModule = angular
  .module('app.components', [
    PostAdd,
    PostList,
    AddNewsApi,
    CmsBtn,
    ConfirmAction,
  ])
  .name;