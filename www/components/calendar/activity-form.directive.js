
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('ActivityFormController',
    function($scope, $ionicModal) {

  $scope.$watch('modal', function() {
    $scope.ready = true;
  });

  $scope.cancel = function() {
    $scope.modal.hide();
  };

  $scope.openIconSelect = function() {
    $scope.ui.selectIconModal.show();
  };

  $scope.openColorSelect = function() {
    $scope.ui.selectColorModal.show();
  };

    // Initialize modals.
  $scope.ui = {};
  $scope.ui.selectIconModal = $ionicModal.fromTemplate(
    '<ion-modal-view class="select-icon-modal">' + 
    '  <select-icon-input modal="ui.selectIconModal"' + 
    '                     on-select="selectIcon(icon)">' +
    '  </select-icon-input>' +
    '</ion-modal-view>', {
    scope: $scope,
    backdropClickToClose: true
  });

  $scope.selectIcon = function(icon) {
    $scope.activity.icon = icon;
  };

  $scope.ui.selectColorModal = $ionicModal.fromTemplate(
    '<ion-modal-view class="select-color-modal">' + 
    '  <select-color-input modal="ui.selectColorModal"' + 
    '                     on-select="selectColor(color)">' +
    '  </select-color-input>' +
    '</ion-modal-view>', {
    scope: $scope,
    backdropClickToClose: true
  });

  $scope.selectColor = function(color) {
    $scope.activity.color = color;
  };
});

calendarModule.directive('activityForm', function() {
  return {
    scope: {
      activity: '=',
      modal: '=',
      save: '&'
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/activity-form.html',
    controller: 'ActivityFormController'
  }
});