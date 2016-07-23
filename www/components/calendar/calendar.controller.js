
var calendarModule = angular.module('inkwell-calendar', ['ionic']);


calendarModule.controller('CalendarController', function($scope) {
	$scope.facts = [
    { title: 'Beers at WerkzeugH' },
    { title: 'Badminton' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' },
    { title: 'Sunrise at X' }
  ];


  // Filled by the ion-slider directive.
  $scope.ui = { 
  	slideOptions: { },
		slider: null
	};

  $scope.$on('$ionicSlides.slideChangeEnd', function(event, data) {
  	console.log('Slide', data.activeIndex, $scope.ui.slider);
  });
});

