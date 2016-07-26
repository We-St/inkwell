
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('ActivityFormController',
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
    $scope.activity.icon = icon;
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
    $scope.activity.color = color;
  };

  $scope.data = { newFriend: '' };
  $scope.addFriend = function() {
    if (!$scope.activity.friends) {
      $scope.activity.friends = [];
    }
    $scope.activity.friends.push({ title: $scope.data.newFriend });
    $scope.data.newFriend = '';
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