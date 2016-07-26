
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('CounterFormController',
    function($scope, $ionicModal) {

  $scope.$watch('modal', function() {
    $scope.ready = true;
  });

  $scope.cancel = function() {
    $scope.modal.hide();
  };


    // Initialize modals.
  $scope.ui = {};

  $scope.openIconSelect = function() {
    $scope.ui.selectIconModal = $ionicModal.fromTemplate(
      '<ion-modal-view class="select-icon-modal">' + 
      '  <select-icon-input modal="ui.selectIconModal"' + 
      '                     on-select="selectIcon(icon)">' +
      '  </select-icon-input>' +
      '</ion-modal-view>', {
      scope: $scope,
      backdropClickToClose: true
    });

    $scope.ui.selectIconModal.show();
  };

  $scope.selectIcon = function(icon) {
    $scope.counter.icon = icon;
  };

  $scope.openColorSelect = function() {
    $scope.ui.selectColorModal = $ionicModal.fromTemplate(
      '<ion-modal-view class="select-color-modal">' + 
      '  <select-color-input modal="ui.selectColorModal"' + 
      '                     on-select="selectColor(color)">' +
      '  </select-color-input>' +
      '</ion-modal-view>', {
      scope: $scope,
      backdropClickToClose: true
    });
    
    $scope.ui.selectColorModal.show();
  };

  $scope.selectColor = function(color) {
    $scope.counter.color = color;
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