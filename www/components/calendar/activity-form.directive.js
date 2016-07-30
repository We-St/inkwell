
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('ActivityFormController',
    function($scope, $ionicModal, activityTypes, activityColors, activityIcons,
             ionicDatePicker, storageService, $timeout) {

  $scope.activityTypes = activityTypes;

  $scope.cancel = function() {
    $scope.modal.hide();
  };

  $scope.expandText = function(){
    // TODO: Move to directive. 
    var element = document.getElementById("description");
    element.style.height =  element.scrollHeight + "px";
  }

  $scope.updateActivityType = function() {
    var type = _.find(activityTypes, { id: $scope.activity.type });
    $scope.activity.icon = _.find(activityIcons, { id: type.icon });
    $scope.activity.color = _.find(activityColors, { id: type.color });
  };

    // Initialize modals.
  $scope.ui = {};

  $scope.selectDate = function() {
    var input = {
      callback: function (val) {
        $scope.activity.date = new Date(val);
      }
    };

    ionicDatePicker.openDatePicker(input);
  };

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

  $scope.chooseImages = function() {
    if (!$scope.images) {
      $scope.images = [];
    }
    
    $scope.images.push({
      base64: 'data:image/jpeg;base64,/9j/4AAQS'
    });

    $scope.images.push({
      base64: 'data:image/jpeg;base64,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'
    });

    // plugins.imagePicker.getPictures(function(results) {
    //   _.forEach(results, function(path) {
    //       plugins.Base64.encodeFile(path, function(base64) {
    //         var prefixless = base64.substring(base64.indexOf('base64,') + 'base64,'.length);
    //         console.log(prefixless);
    //         var file = {
    //           base64: 'data:image/jpeg;base64,' + prefixless,
    //           path: path
    //         };

    //         $timeout(function() {
    //           $scope.images.push(file);
    //         });

    //         cordova.base64ToGallery(prefixless, { prefix: 'inkwell_', mediaScanner: true }, function(success) {
    //           console.log(JSON.stringify(success));
    //         }, function(error) {
    //           console.log(JSON.stringify(error));
    //         });
    //       });

    //     // storageService.archiveImage(path).then(function(file) {
    //     //   plugins.Base64.encodeFile(file.nativeURL, function(base64) {
    //     //     file.base64 = base64;
    //     //     $scope.images.push(file);
    //     //   });
    //     // });
    //   });
    // }, function(error) {
    //   console.log(error);
    // }, {
    //   maximumImagesCount: 100,
    //   width: 800
    // });
  };

  $scope.ui.addCounterModal = $ionicModal.fromTemplate(
    '<ion-modal-view class="counter-modal">' + 
    '  <counter-form modal="ui.addCounterModal"' + 
    '                counter="counter"' +
    '                save="addCounter(counter)">' +
    '  </counter-form>' +
    '</ion-modal-view>', {
    scope: $scope,
    backdropClickToClose: true
  });

  $scope.openAddCounterForm = function(counter) {
    $scope.counter = counter || { value: 0 };
    $scope.ui.addCounterModal.show();
  };

  $scope.addCounter = function(counter){
    if (!$scope.activity.counters) {
      $scope.activity.counters = [];
    }
    if($scope.activity.counters.indexOf(counter) === -1) {
      $scope.activity.counters.push(counter);
    }
  };

  $scope.deleteCounter = function(counter) {
    var idx = $scope.activity.counters.indexOf(counter);
    if (idx >= 0) {
      $scope.activity.counters.splice(idx, 1);
    }
  };

  $scope.deleteFriend = function(friend) {
    var idx = $scope.activity.friends.indexOf(friend);
    if (idx >= 0) {
      $scope.activity.friends.splice(idx, 1);
    }
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