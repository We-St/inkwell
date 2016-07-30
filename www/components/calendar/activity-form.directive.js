
var calendarModule = angular.module('inkwell-calendar');

calendarModule.controller('ActivityFormController',
    function($scope, $ionicModal, $cordovaCamera, activityTypes, activityColors, activityIcons,
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

    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: Camera.EncodingType.PNG,
      width: 100,
      height: 100,
      quality: 50
    };

    $cordovaCamera.getPicture(options).then(function (galleryPath) {


        var file = {
          src: 'data:image/png;base64,' + galleryPath
        };

        $timeout(function() {
          $scope.images.push(file);
        });

      // storageService.archiveImage(galleryPath).then(function(file) {
      //   //console.info("xxx", file);
      

      //   plugins.Base64.encodeFile(file.nativeURL, function(base64) {
      //     file.base64 = base64;
      //     console.log("base64", base64.substr(100));
      //     $scope.images.push(file);
      //   });

      // });

      // _.forEach(results, function(path) {
      //     plugins.Base64.encodeFile(path, function(base64) {
      //       var file = {
      //         base64: base64,
      //         path: path
      //       };

      //       $timeout(function() {
      //         $scope.images.push(file);
      //       });
      //     });

      //   // storageService.archiveImage(path).then(function(file) {
      //   //   plugins.Base64.encodeFile(file.nativeURL, function(base64) {
      //   //     file.base64 = base64;
      //   //     $scope.images.push(file);
      //   //   });
      //   // });
      // });
    }, function(error) {
      console.log(error);
    });
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