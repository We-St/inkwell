
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('LocationFormController',
    function($scope, $cordovaGeolocation) {

  $scope.cancel = function() {
    $scope.modal.hide();
  };

  // var options = { maximumAge: 0, timeout: 5000, enableHighAccuracy: true };
  // navigator.geolocation.watchPosition(function(result) {
  //   console.info(result);
  // }, function(error) {
  //   console.error(JSON.stringify(error));
  //   for(var x in error) {
  //     console.info(x, error[x]);
  //   }
  // }, options);



});

calendarModule.directive('locationForm', function() {
  return {
    scope: {
      location: '=',
      modal: '=',
      save: '&'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/location-form.html',
    controller: 'LocationFormController'
  }
});