import { postTotal } from './total.module';

describe('total component', function() {

  beforeEach(angular.mock.module(postTotal));

  var $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('mid pages', function(){

    var element = $compile('<posts-total limit="10" active="2" total="64"></posts-total>')($rootScope);
    $rootScope.$digest();

    expect(element.html()).toContain("11-20 of 64");
  });

  it('last pages', function(){

    var element = $compile('<posts-total limit="10" active="7" total="64"></posts-total>')($rootScope);
    $rootScope.$digest();

    expect(element.html()).toContain("61-64 of 64");
  });

});
