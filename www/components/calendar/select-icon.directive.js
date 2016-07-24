var calendarModule = angular.module('inkwell-calendar');

calendarModule.directive('selectIconInput', function() {
	return {
		scope: {
			modal: '=',
			onSelect: '&'
		},
		restrict: 'E',
		replace: true,
		templateUrl: 'components/calendar/select-icon.html',
		controller: function($scope, activityIcons) {
			$scope.activityIcons = activityIcons;
		}
	}
});
