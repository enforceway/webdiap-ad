'use strict';

/* Controllers */

angular.module('app')
.controller('AppController', ['$state', '$scope', '$translate', '$localStorage', '$window', 
  function($state, $scope, $translate, $localStorage, $window) {
  $scope.ifActiveMenu = function(target) {
    var ifActive = false;
    if(Object.prototype.toString.call(target).toLowerCase() != '[object array]') {
      target = [target]
    }
    ifActive = (target.indexOf($state.current.name) > -1)
    return ifActive;
  };
}]);
angular.module('app').filter('diDate', function() {
  return function(text, str) {
    str = str || 'yyyy-MM-dd hh:mm:ss'
    return new Date(text).Format(str);
  }
});