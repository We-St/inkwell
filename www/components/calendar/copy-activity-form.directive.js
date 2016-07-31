
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('CopyActivityFormController',
    function($scope, storageService) {

  $scope.cancel = function() {
    $scope.modal.hide();
  };

    console.log('blabla');
  storageService.getAllFacts().then(function(activities) {
    $scope.activities = activities;
    console.log(activities.length);
  });

});

calendarModule.directive('copyActivityForm', function() {
  return {
    scope: {
      modal: '=',
      onSelect: '&'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/copy-activity-form.html',
    controller: 'CopyActivityFormController'
  }
});