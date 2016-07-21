
var calendarModule = angular.module('inkwell-calendar', ['ionic']);


calendarModule.controller('CalendarController', function($scope) {
	$scope.facts = [
    { title: 'Beers at WerkzeugH' },
    { title: 'Badminton' },
    { title: 'Sunrise at X' }
  ];
});

