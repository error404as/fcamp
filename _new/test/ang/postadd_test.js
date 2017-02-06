import { PostAdd } from '../../src/cms/components/postadd/postadd.module';

describe('post form directive', function() {
  var suite = {};


  beforeEach(angular.mock.module(PostAdd));

  beforeEach(angular.mock.inject(function($injector, $compile, $rootScope){
    suite = {};
    suite.scope = $rootScope;
    suite.compile = $compile;
    suite.element = '<post-add></post-add>';
    suite.$httpBackend = $injector.get('$httpBackend');
    suite.$httpBackend.when('GET','/api/post/1').respond({
        headline: 'Title',
        body: 'Text',
        tags: 'my',
        permalink: '1'
      });
  }));

  afterEach(()=>{
    suite.$httpBackend.verifyNoOutstandingExpectation();
    suite.$httpBackend.verifyNoOutstandingRequest();
    suite = null;
  });

  it('testtt', function() {
    var element = suite.compile(suite.element)(suite.scope);
    suite.scope.$digest();
    //console.log(suite.scope.model.post)
    //suite.$httpBackend.expectGET('/api/post/1');
    //suite.$httpBackend.flush();

    expect(element.html()).toContain('id="add_post"');
  });

});
