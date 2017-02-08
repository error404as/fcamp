import { Promise } from 'es6-promise';
import { PostAdd } from './postadd.module';

describe('post form directive', function() {
  var suite = {};

  var testRouteValue = null;


  beforeEach(angular.mock.module(PostAdd));

  beforeEach(angular.mock.module(function($provide) {
    $provide.value('router', {
      getId: function(){ return testRouteValue } 
    });

    // avoiding $http calls
    $provide.value('fetcher', {
      getPost: function(id){
        return new Promise(function(resolve, reject) { })
      } 
    });
  }));

  beforeEach(angular.mock.inject(function($compile, $rootScope){
    suite = {};
    suite.scope = $rootScope;
    suite.compile = $compile;
    suite.element = '<post-add></post-add>';

  }));

  afterEach(()=>{
    suite = null;
  });

  it('add post form html', function() {

    testRouteValue = null; // no page ID from router service

    var element = suite.compile(suite.element)(suite.scope);
    suite.scope.$digest();

    expect(element.html()).toContain('Add new post');
    expect(element.html()).not.toContain('Edit post');
  });

  it('edit post form html', function() {

    testRouteValue = 1; // router service pass in a post ID - edit mode

    var element = suite.compile(suite.element)(suite.scope);
    suite.scope.$digest();

    expect(element.html()).toContain('Edit post');
    expect(element.html()).not.toContain('Add new post');
  });

});

