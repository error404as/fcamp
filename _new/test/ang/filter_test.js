import { appPager } from '../../src/ang-components/pager/pager.module';

describe('active pager item filter', function() {

  beforeEach(angular.mock.module(appPager));

  var suite = {};

  beforeEach(inject(function($filter){
    suite.flt = $filter('pager');
  }));
  afterEach(inject(function($filter){
    suite = {};
  }));

  it('othe page', function(){
    let result = suite.flt('test', false)

    expect(result).toContain("test");
  });

  it('current page', function(){
    let result = suite.flt('test', true)

    expect(result).toContain("<b>test</b>");
  });

});