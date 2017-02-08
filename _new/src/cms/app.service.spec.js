import AppService from './app.service';

describe('app.service', function() {
  var suite = {};

  beforeEach(angular.mock.module(AppService));

  beforeEach(angular.mock.inject(function($injector){
    suite = {};
    suite.$httpBackend = $injector.get('$httpBackend');
    suite.$httpBackend.whenGET('/api/posts/2').respond(['1','a']);
    suite.fetcher = $injector.get('fetcher');
    
  }));

  afterEach(()=>{
    suite.$httpBackend.verifyNoOutstandingExpectation();
    suite.$httpBackend.verifyNoOutstandingRequest();
    suite = null;
  })

  it('service getPosts', function(){
    var items = suite.fetcher.getPosts(2);

    suite.$httpBackend.expectGET('/api/posts/2');
    suite.$httpBackend.flush(); 

    items.then(function(resp){
      expect(resp).toBeDefined();
      expect(resp.length).toBe(2);
    });
  });

});
