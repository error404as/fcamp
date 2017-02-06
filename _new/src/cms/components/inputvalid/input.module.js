import angular from 'angular';

export default function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function mycheckLength(value) {
        if (value.length > 20) {
          mCtrl.$setValidity('milen', true);
        } else {
          mCtrl.$setValidity('milen', false);
        }
        return value;
      }
      mCtrl.$parsers.push(mycheckLength);
    }
  };
};