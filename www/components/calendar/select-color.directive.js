var calendarModule = angular.module('inkwell-calendar');

calendarModule.directive('selectColorInput', function() {
  return {
    scope: {
      modal: '=',
      onSelect: '&'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/select-color.html',
    controller: function($scope, activityColors) {
      $scope.activityColors = activityColors;
    }
  }
});
