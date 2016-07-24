
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('CalendarController', function($scope, $ionicModal) {
	$scope.facts = [
    { title: 'Beers at WerkzeugH' },
    { title: 'Badminton' },
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


  // Initialize modals.
  $scope.ui.addActivityModal = $ionicModal.fromTemplate(
    '<ion-modal-view>' + 
    '	 <activity-form modal="ui.addActivityModal"' + 
    '                 activity="selectedFact"' +
    '									save="saveActivity(activity)">' +
    '  </activity-form>' +
  	'</ion-modal-view>', {
  	scope: $scope,
  	focusFirstInput: true
  });

  $scope.addActivity = function() {
  	$scope.selectedFact = {};
  	$scope.ui.addActivityModal.show();
  };

  $scope.saveActivity = function(activity) {
  	console.log(activity);
  	$scope.facts.push(activity);
  };
});

