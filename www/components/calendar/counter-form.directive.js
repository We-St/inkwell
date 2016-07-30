
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('CounterFormController',
    function($scope, $ionicModal) {

  $scope.cancel = function() {
    $scope.modal.hide();
  };

});

calendarModule.directive('counterForm', function() {
  return {
    scope: {
      counter: '=',
      modal: '=',
      save: '&'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/counter-form.html',
    controller: 'CounterFormController'
  }
});